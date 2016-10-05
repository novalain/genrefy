class GenreFetcher {
  static fetch(blob) {
    return fetch(GenreFetcher.API_URL, {
             headers: {'Content-Type': 'application/octet-stream'},
             method: "POST",
             body: blob
           })
        .then(res => res.text());
  }
}

GenreFetcher.API_URL = 'http://127.0.0.1:5000/messages'
