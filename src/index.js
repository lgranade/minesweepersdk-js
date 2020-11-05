'use strict';

const axios = require('axios')

var sdk = {}
var initialized = false

sdk.init = function (options) {
  if (!initialized) {
    if (!options) {
      throw new Error("No options in init()")
    }
    if (!options.baseURL) {
      throw new Error("No baseURL for Minesweeper API in init()")
    }
    sdk.options = options
  }
  return Promise.resolve()
}

sdk.authenticate = function (params) {
  if (!sdk.initialized) {
    return Promise.reject(new Error("SDK not initialized"))
  }
  return axios.post(`${sdk.options.baseURL}/auth`, {
    name: params.name,
    password: params.password
  })
  .then(function (response) {
    if (response.status == 200) {
      sdk.accessToken = response.accessToken
    } else if (response.status == 400) {
      throw new Error("Bad request")      
    } else if (response.status == 401) {
      throw new Error("Unauthorized")
    } else {
      throw new Error("Internal error")
    }
    return Promise.resolve()
  })
  .catch(function (error) {
    throw error    
  })
}

sdk.createUser = function (params) {
  if (!sdk.initialized) {
    return Promise.reject(new Error("SDK not initialized"))
  }  
  return axios.post(`${sdk.options.baseURL}/users`, {
    name: params.name,
    password: params.password
  })
  .then(function (response) {
    if (response.status == 201) {
      return Promise.resolve(response.data)
    } else if (response.status == 400) {
      throw new Error("Bad request")
    } else if (response.status == 409) {
      throw new Error("Name already used")
    } else {
      throw new Error("Internal error")
    }
  })
  .catch(function (error) {
    throw error    
  })
}

sdk.readUser = function (params) {
  if (!sdk.initialized) {
    return Promise.reject(new Error("SDK not initialized"))
  }
  if (!sdk.accessToken) {
    return Promise.reject(new Error("User not signed in"))
  }
  return axios({
    method: 'get',
    url: `${sdk.options.baseURL}/users/${params.userId}`,
    headers: {
      Authorization: 'Bearer ' + sdk.accessToken
    }
  })
  .then(function (response) {
    if (response.status == 200) {
      return Promise.resolve(response.data)
    } else if (response.status == 400) {
      throw new Error("Bad request")
    } else if (response.status == 401) {
      throw new Error("Unauthorized")
    } else if (response.status == 403) {
      throw new Error("Forbidden")
    } else {
      throw new Error("Internal error")
    }
  })
  .catch(function (error) {
    throw error    
  })
}

sdk.createGame = function (params) {
  if (!sdk.initialized) {
    return Promise.reject(new Error("SDK not initialized"))
  }
  if (!sdk.accessToken) {
    return Promise.reject(new Error("User not signed in"))
  }
  return axios({
    method: 'post',
    url: `${sdk.options.baseURL}/games`,
    data: {
      rows: params.rows,
      columns: params.columns,
      mines: params.mines
    },
    headers: {
      Authorization: 'Bearer ' + sdk.accessToken
    }
  })
  .then(function (response) {
    if (response.status == 201) {
      return Promise.resolve(response.data)
    } else if (response.status == 400) {
      throw new Error("Bad request")
    } else if (response.status == 401) {
      throw new Error("Unauthorized")
    } else {
      throw new Error("Internal error")
    }
  })
  .catch(function (error) {
    throw error    
  })
}

sdk.readGame = function (params) {
  if (!sdk.initialized) {
    return Promise.reject(new Error("SDK not initialized"))
  }
  if (!sdk.accessToken) {
    return Promise.reject(new Error("User not signed in"))
  }
  return axios({
    method: 'get',
    url: `${sdk.options.baseURL}/games/${params.gameId}`,
    headers: {
      Authorization: 'Bearer ' + sdk.accessToken
    }
  })
  .then(function (response) {
    if (response.status == 200) {
      return Promise.resolve(response.data)
    } else if (response.status == 400) {
      throw new Error("Bad request")
    } else if (response.status == 401) {
      throw new Error("Unauthorized")
    } else if (response.status == 403) {
      throw new Error("Forbidden")
    } else {
      throw new Error("Internal error")
    }
  })
  .catch(function (error) {
    throw error    
  })
}

sdk.playGame = function (params) {
  if (!sdk.initialized) {
    return Promise.reject(new Error("SDK not initialized"))
  }
  if (!sdk.accessToken) {
    return Promise.reject(new Error("User not signed in"))
  }
  return axios({
    method: 'post',
    url: `${sdk.options.baseURL}/games/${params.gameId}/play`,
    data: {
      row: params.row,
      column: params.column,
      action: params.action
    },
    headers: {
      Authorization: 'Bearer ' + sdk.accessToken
    }
  })
  .then(function (response) {
    if (response.status == 200) {
      return Promise.resolve(response.data)
    } else if (response.status == 400) {
      throw new Error("Bad request")
    } else if (response.status == 401) {
      throw new Error("Unauthorized")
    } else if (response.status == 403) {
      throw new Error("Forbidden")
    } else {
      throw new Error("Internal error")
    }
  })
  .catch(function (error) {
    throw error    
  })
}

sdk.pauseGame = function (params) {
  if (!sdk.initialized) {
    return Promise.reject(new Error("SDK not initialized"))
  }
  if (!sdk.accessToken) {
    return Promise.reject(new Error("User not signed in"))
  }
  return axios({
    method: 'post',
    url: `${sdk.options.baseURL}/games/${params.gameId}/pause`,
    headers: {
      Authorization: 'Bearer ' + sdk.accessToken
    }
  })
  .then(function (response) {
    if (response.status == 200) {
      return Promise.resolve(response.data)
    } else if (response.status == 400) {
      throw new Error("Bad request")
    } else if (response.status == 401) {
      throw new Error("Unauthorized")
    } else if (response.status == 403) {
      throw new Error("Forbidden")
    } else {
      throw new Error("Internal error")
    }
  })
  .catch(function (error) {
    throw error    
  })
}

export default sdk
