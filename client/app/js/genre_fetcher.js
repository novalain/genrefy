class GenreFetcher {
  static fetch(blob) {
    return fetch(GenreFetcher.API_URL, {
             method: "post",
             body: blob
           })
        .then(res => res.text());
  }
}

GenreFetcher.API_URL = 'http://127.0.0.1:5000/messages'
