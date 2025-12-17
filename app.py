from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)

# Database config
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DB_PATH = os.path.join(BASE_DIR, "blog.db")

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + DB_PATH
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# =====================
# Database Model
# =====================
class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    tags = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# =====================
# Routes
# =====================
@app.route("/")
def home():
    return send_from_directory(".", "index.html")

@app.route("/api/posts", methods=["GET"])
def get_posts():
    posts = Post.query.order_by(Post.created_at.desc()).all()
    return jsonify([
        {
            "id": p.id,
            "title": p.title,
            "content": p.content,
            "tags": p.tags,
            "created_at": p.created_at.strftime("%Y-%m-%d %H:%M")
        }
        for p in posts
    ])

@app.route("/api/posts", methods=["POST"])
def create_post():
    data = request.get_json()
    if not data or not data.get("title") or not data.get("content"):
        return jsonify({"error": "Missing data"}), 400

    post = Post(
        title=data["title"],
        content=data["content"],
        tags=data.get("tags", "")
    )
    db.session.add(post)
    db.session.commit()
    return jsonify({"message": "Post created"}), 201

@app.route("/api/posts/<int:post_id>", methods=["PUT"])
def update_post(post_id):
    post = Post.query.get_or_404(post_id)
    data = request.get_json()

    post.title = data.get("title", post.title)
    post.content = data.get("content", post.content)
    post.tags = data.get("tags", post.tags)

    db.session.commit()
    return jsonify({"message": "Post updated"})

@app.route("/api/posts/<int:post_id>", methods=["DELETE"])
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    return jsonify({"message": "Post deleted"})

# =====================
# Main
# =====================
if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    # Render uses PORT env variable
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
