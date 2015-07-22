# pillbug [![Build Status](https://travis-ci.org/Urucas/pillbug.svg)](https://travis-ci.org/Urucas/pillbug)
Quick Static Express Server 

#Usage
```bash
$ npm install -g pillbug
$ pillbug [port]
```

Serve current folder static html
```bash 
$ pillbug
// or
$ pillbug 8009
```

**Optional**
```bash
$ pillbug --proxy
```
And make cross-domain calls from your code like:
```javascript
$.ajax({
  url: '/proxy',
  dataType: 'json',
  type: 'GET',
  data: {url: 'http://gpai-service.herokuapp.com/?id=com.urucas.wifime'},
  success: function(data) {
    // do something with your data
  }
});
```
