from flask import Flask, url_for
from flask import request
app = Flask(__name__)

from flask import json

@app.route('/messages', methods = ['POST'])
def api_message():
  if request.headers['Content-Type'] == 'text/plain':
    return "Text Message: " + request.data
  elif request.headers['Content-Type'] == 'application/json':
    return "JSON Message: " + json.dumps(request.json)
  elif request.headers['Content-Type'] == 'application/octet-stream':
    # Open file and write binary (blob) data
    f = open('./binary', 'wb')
    f.write(request.data)
    f.close()
    return "Binary message written!"
  else:
    # request.data gives the same result as using FormData on client side
    # and using request.files['file']
    print request.data
    return "415 unsupported media type"

if __name__ == '__main__':
  app.run()
