let locIndex
if (localStorage.getItem('locIndex') === null || localStorage.getItem('locIndex') === undefined || localStorage.getItem('locIndex') === "") {
  locIndex = 0
  localStorage.setItem('locIndex', locIndex)
} else {
  locIndex = parseInt(localStorage.getItem('locIndex'))
}

let qid
if (localStorage.getItem('qid') === null || localStorage.getItem('qid') === undefined || localStorage.getItem('qid') === "") {
  qid = 0
  localStorage.setItem('qid', qid)
} else {
  qid = parseInt(localStorage.getItem('qid'))
}

async function fetchUserDetails() {
  try {
    const res = await axios.get(`https://ar-backend-seven.vercel.app/api/v1/user/${localStorage.getItem('uid')}`)
    console.log(res)
    localStorage.setItem('userDetails', JSON.stringify(res.data.result))
    
    // Sync level from backend if available
    if (res.data.result && res.data.result.level !== undefined) {
      localStorage.setItem('locIndex', res.data.result.level)
      locIndex = res.data.result.level
    }
  } catch (error) {
    console.log(error)
  }
}

if (localStorage.getItem('uid') != null) {
  console.log(localStorage.getItem('uid'))
  fetchUserDetails()
}