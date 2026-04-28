import os
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import sqlite3
from flask_bcrypt import Bcrypt
import pandas as pd

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

# DB connection
def get_db():
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    return conn

# Create table
def create_table():
    conn = get_db()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            password TEXT,
            country TEXT,
            state TEXT
        )
    ''')
    conn.commit()
    conn.close()

create_table()

# SIGNUP
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    hashed = bcrypt.generate_password_hash(password).decode("utf-8")

    try:
        conn = get_db()
        conn.execute(
            "INSERT INTO users (email, password) VALUES (?, ?)", 
            (email, hashed)
        )
        conn.commit()
        conn.close()
        return jsonify({"message": "User registered"})
    except:
        return jsonify({"message": "User already exists"})

# LOGIN
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    conn = get_db()
    user = conn.execute(
        "SELECT * FROM users WHERE email=?", 
        (email,)
    ).fetchone()
    conn.close()

    if user and bcrypt.check_password_hash(user["password"], password):
        return jsonify({"message": "Login successful"})
    else:
        return jsonify({"message": "Invalid email or password"})

# SAVE DETAILS
@app.route("/save-details", methods=["POST"])
def save_details():
    data = request.json
    email = data.get("email")
    country = data.get("country")
    state = data.get("state")

    conn = get_db()
    conn.execute(
        "UPDATE users SET country=?, state=? WHERE email=?",
        (country, state, email)
    )
    conn.commit()
    conn.close()

    return jsonify({"message": "Details saved successfully"})

# 🔥 GET ALL USERS (API)
@app.route("/users", methods=["GET"])
def get_users():
    conn = get_db()
    users = conn.execute(
        "SELECT email, country, state FROM users"
    ).fetchall()
    conn.close()

    return jsonify([dict(u) for u in users])

# 🔥 EXPORT TO EXCEL
@app.route("/export", methods=["GET"])
def export_excel():
    conn = get_db()
    users = conn.execute(
        "SELECT email, password, country, state FROM users"
    ).fetchall()
    conn.close()

    import pandas as pd

    df = pd.DataFrame(users, columns=["email", "password", "country", "state"])
    file_path = os.path.join(os.getcwd(), "users.xlsx")
    df.to_excel(file_path, index=False)

    return send_file(file_path, as_attachment=True)

# HOME
@app.route("/")
def home():
    return "Backend running 🚀"

if __name__ == "__main__":
    app.run(debug=True)