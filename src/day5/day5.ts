import {Md5} from "ts-md5";

export const getPassword = (doorId: string): string => {
    const password : string[] = []
    let index = 0;
    while (password.length < 8) {
        const hash = Md5.hashStr(doorId+index.toString())
        if (hash.startsWith("00000")){
            password.push(hash.charAt(5))
        }
        index = index + 1;
    }
    return password.join("");
}

export const getComplexPassword = (doorId: string): string => {
    let password =  "--------"
    let index = 0;
    while (password.includes("-")) {
        const hash = Md5.hashStr(doorId+index.toString())
        if (hash.startsWith("00000")){
            const pos = Number(hash.charAt(5))
            if (pos <8 && password.charAt(pos)=="-" ){
                const val = hash.charAt(6)
                password = password.setCharAt(pos, val)
            }
        }
        index = index + 1;
    }
    return password;
}
