export const isAuthenticated = () => {
    if(typeof window === "undefined") {
        return false
    }

    if(localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    } else {
        return false
    }

};



export const signout = (next) => {
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt")
    } 
    next()
    return fetch(`http://localhost:5000/auth/signout`, {
        method: "GET"
    })
    .then(res => {
        return res.json()

    })
    .catch(err => console.log(err))

};




export const brandSignout = (next) => {
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt")
    } 
    next()
    return fetch(`http://localhost:5000/brandauth/signout`, {
        method: "GET"
    })
    .then(res => {
        console.log('signout', res)
        return res.json()

    })
    .catch(err => console.log(err))

};




export const updateUser = ( user ) => {
    if(typeof window !== "undefined") {
        if(localStorage.getItem('jwt')) {
            let auth = JSON.parse(localStorage.getItem('jwt'))
            auth.user = user 
            localStorage.setItem('jwt', JSON.stringify(auth))
        }
        
    };
};


export const updateBrandUser = ( branduser ) => {
    if(typeof window !== "undefined") {
        if(localStorage.getItem('jwt')) {
            let auth = JSON.parse(localStorage.getItem('jwt'))
            auth.branduser = branduser 
            localStorage.setItem('jwt', JSON.stringify(auth))
        }
        
    };
};