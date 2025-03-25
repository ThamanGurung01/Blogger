export const setCookie=(isLoggedIn)=>{
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 6);
    document.cookie = `isLoggedIn=${isLoggedIn}; expires=${expirationDate.toUTCString()}; path=/`;
}
export const getCookie=(name)=>{
        const cookie = document.cookie.split(';');
        
        for (let i = 0; i < cookie.length; i++) {
            const cookiePair = cookie[i].trim();
            if (cookiePair.startsWith(name + '=')) {
                return cookiePair.substring(name.length + 1);
            }
        }
        
        return null;
}
export const deleteCookie=(cookies)=>{
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const cookieName = cookie.split('=')[0].trim();
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
}