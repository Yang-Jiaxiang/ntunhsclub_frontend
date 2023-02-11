import axios from 'axios'

export const getAllData = async () => {
  try {
    const response = await axios.get(window.env.API_SERVER + '/lecturer')
    //console.log(response.data.results)
    return response.data.results
  } catch (e) {
    console.log(e)
  }
}

export const putData = async (id, data) => {
  try {
    const response = await axios.patch(window.env.API_SERVER + '/lecturer/' + id, data)
    //console.log(response.data.results)
    return response.data.results
  } catch (e) {
    console.log(e)
  }
}

export const postData = async (data) => {
  try {
    const response = await axios.post(window.env.API_SERVER + '/lecturer', data)
    //console.log(response.data.results)
    return response.data.results
  } catch (e) {
    console.log(e)
  }
}

export const SearchData = async (id, name) => {
  var sql = ''
  if (id) {
    sql = 'tID=' + id
    if (name) {
      sql += '&Name=' + encodeURI(name)
    }
  } else {
    if (name) {
      sql += 'Name=' + encodeURI(name)
    }
  }

  try {
    const response = await axios.get(window.env.API_SERVER + '/search?' + sql)
    //console.log(response.data.results)
    return response.data.results
  } catch (e) {
    console.log(e)
  }
}

export const downloadExampleCsv = async () => {
  try {
    const response = await axios.get(window.env.API_SERVER + '/upload/example')
    //console.log(response.data.results)
    return response.data.results
  } catch (e) {
    console.log(e)
  }
}

export const upLoadCsv = async (data) => {
  try {
    const response = await axios.post(
      window.env.API_SERVER + '/upload/excelToJson',
      {
        file: data,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    console.log(response)
    //return response.data.results
  } catch (e) {
    console.log(e)
  }
}
