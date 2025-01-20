from ..models.users import User
from flask_restx import Resource,Namespace,fields
from ..models.users import User
from ..utils import db

from flask import Blueprint, jsonify, request
from api.models.users import User
from api.models.orders import Order
from api.config import db

# Blueprint for users
users_blueprint = Blueprint('users', __name__)

@users_blueprint.route('/users/<int:user_id>/profile', methods=['GET'])
def get_user_profile(user_id):
    """
    Retrieve user profile information, including user details and order history.
    """
    try:
        # Fetch user details
        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Fetch order history for the user
        orders = Order.query.filter_by(user_id=user_id).all()
 
        # Format user details
        user_data = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "location": user.location,
            "is_staff": user.is_staff,
            "is_active": user.is_active,
            "created_at": user.created_at,
            "updated_at": user.updated_at
        }

	# Format order history
        order_history = []
        for order in orders:
            order_history.append({
                "id": order.id,
                "order_status": order.order_status,
                "service": order.service,
                "quantity": order.quantity,
                "total": order.total,
                "date_created_at": order.date_created_at
            })
	
	# Combine user details and order history
        profile_data = {
            "user": user_data,
            "orders": order_history
        }

        return jsonify(profile_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


users_namespace=Namespace("users", description="namespace for User operations")

user_model=users_namespace.model(
    'User',{
        'id':fields.Integer(description='An ID'),
        'username':fields.String(description='Username'),
        'email':fields.String(description='Email'),
        'location':fields.String(description='Location'),
        'is_staff':fields.Boolean(description='Staff status'),
        'is_active':fields.Boolean(description='Active status'),
        'created_at':fields.DateTime(description='Date created'),
        'updated_at':fields.DateTime(description='Date updated'),
    }
)

@users_namespace.route("/users/")
class UserResource(Resource):
    def get():
        pass
