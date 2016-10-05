from flask import Flask, url_for
app = Flask(__name__)

@app.route('/')
def api_root():
    return 'Hello world'

if __name__ == '__main__':
    app.run()
