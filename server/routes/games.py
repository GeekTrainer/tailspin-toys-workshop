from flask import jsonify, request, Response, Blueprint
from models import db, Game, Publisher, Category
from sqlalchemy.orm import Query

# Create a Blueprint for games routes
games_bp = Blueprint('games', __name__)

def get_games_base_query() -> Query:
    return db.session.query(Game).join(
        Publisher, 
        Game.publisher_id == Publisher.id, 
        isouter=True
    ).join(
        Category, 
        Game.category_id == Category.id, 
        isouter=True
    )

@games_bp.route('/api/games', methods=['GET'])
def get_games() -> Response:
    """Get all games with optional filtering by publisher_id and category_id."""
    query = get_games_base_query()
    
    # Apply publisher filter if provided
    publisher_id = request.args.get('publisher_id', type=int)
    if publisher_id is not None:
        query = query.filter(Game.publisher_id == publisher_id)
    
    # Apply category filter if provided
    category_id = request.args.get('category_id', type=int)
    if category_id is not None:
        query = query.filter(Game.category_id == category_id)
    
    games_query = query.all()
    games_list = [game.to_dict() for game in games_query]
    
    return jsonify(games_list)

@games_bp.route('/api/publishers', methods=['GET'])
def get_publishers() -> Response:
    """Get all publishers for filter dropdown."""
    publishers = db.session.query(Publisher).order_by(Publisher.name).all()
    return jsonify([publisher.to_dict() for publisher in publishers])

@games_bp.route('/api/categories', methods=['GET'])
def get_categories() -> Response:
    """Get all categories for filter dropdown."""
    categories = db.session.query(Category).order_by(Category.name).all()
    return jsonify([category.to_dict() for category in categories])

@games_bp.route('/api/games/<int:id>', methods=['GET'])
def get_game(id: int) -> tuple[Response, int] | Response:
    # Use the base query and add filter for specific game
    game_query = get_games_base_query().filter(Game.id == id).first()
    
    # Return 404 if game not found
    if not game_query: 
        return jsonify({"error": "Game not found"}), 404
    
    # Convert the result using the model's to_dict method
    game = game_query.to_dict()
    
    return jsonify(game)
