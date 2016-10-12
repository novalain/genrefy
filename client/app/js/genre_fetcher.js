class GenreFetcher {
  static fetch(blob, data) {
    const headers = {
      'Content-Type': 'audio/wav',
      'Classifier': data.Classifier,
      'K': data.K
    };

    console.log("sending blob", blob);
    console.log("sending headers", headers);

    return fetch(GenreFetcher.API_URL, {headers, method: "post", body: blob})
        .then(res => res.text());
  }
}

GenreFetcher.API_URL = 'http://127.0.0.1:5000/messages'
