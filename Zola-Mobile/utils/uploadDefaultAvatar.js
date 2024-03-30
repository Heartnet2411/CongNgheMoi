const uploadDefaultAvatar = (lastName) => {
    //lấy chữ cái đầu tiên của lastName
    const firstLetter = lastName.charAt(0).toUpperCase()

    switch (firstLetter) {
        case 'A':
            return 'https://myzolaappbucket.s3.ap-southeast-1.amazonaws.com/Avatar/A.png'
        case 'B':
            return 'https://myzolaappbucket.s3.ap-southeast-1.amazonaws.com/Avatar/B.png'
        case 'C':
            return 'https://myzolaappbucket.s3.ap-southeast-1.amazonaws.com/Avatar/C.png'
        case 'D':
            return 'https://myzolaappbucket.s3.ap-southeast-1.amazonaws.com/Avatar/D.png'
        case 'E':
            return 'https://myzolaappbucket.s3.ap-southeast-1.amazonaws.com/Avatar/E.png'
        case 'F':
            return 'https://myzolaappbucket.s3.ap-southeast-1.amazonaws.com/Avatar/F.png'
        case 'G':
            return 'https://myzolaappbucket.s3.ap-southeast-1.amazonaws.com/Avatar/G.png'
        case 'H':
            return 'https://myzolaappbucket.s3.ap-southeast-1.amazonaws.com/Avatar/H.png'
        case 'I':
            return 'https://myzolaappbucket.s3.ap-southeast-1.amazonaws.com/Avatar/I.png'
        case 'J':
            return 'https://myzolaappbucket.s3.ap-southeast-1.amazonaws.com/Avatar/J.png'
        case 'K':
            return 'https://myzolaappbucket.s3.ap-southeast-1.amazonaws.com/Avatar/K.png'
        case 'L':
            return 'https://myzolaappbucket.s3.ap-southeast-1.amazonaws.com/Avatar/L.png'
        case 'M':
            return 'https://myzolaappbucket.s3.ap-southeast-1.amazonaws.com/Avatar/M.png'
        case 'N':
            return 'https://myzolaappbucket.s3.ap-southeast-1.amazonaws.com/Avatar/N.png'
        case 'O':
            return 'https://myzolaappbucket.s3.ap-southeast-1.amazonaws.com/Avatar/O.png'
        case 'P':
            return 'https://myzolaappbucket.s3.ap-southeast-1.amazonaws.com/Avatar/P.png'
        case 'Q':
            return 'https://myzolaappbucket.s3.ap-southeast-1.amazonaws.com/Avatar/Q.png'
        case 'R':
            return 'https://myzolaappbucket.s3.ap-southeast-1.amazonaws.com/Avatar/R.png'
        case 'S':
            return 'https://myzolaappbucket.s3.ap-southeast-1.amazonaws.com/Avatar/S.png'
        case 'T':
            return 'https://myzolaappbucket.s3.ap-southeast-1.amazonaws.com/Avatar/T.png'
        case 'U':
            return 'https://myzolaappbucket.s3.ap-southeast-1.amazonaws.com/Avatar/U.png'
        case 'V':
            return 'https://myzolaappbucket.s3.ap-southeast-1.amazonaws.com/Avatar/V.png'
        case 'W':
            return 'https://myzolaappbucket.s3.ap-southeast-1.amazonaws.com/Avatar/W.png'
        case 'X':
            return 'https://myzolaappbucket.s3.ap-southeast-1.amazonaws.com/Avatar/X.png'
        case 'Y':
            return 'https://myzolaappbucket.s3.ap-southeast-1.amazonaws.com/Avatar/Y.png'
        case 'Z':
            return 'https://myzolaappbucket.s3.ap-southeast-1.amazonaws.com/Avatar/Z.png'
        default:
            return 'https://myzolaappbucket.s3.ap-southeast-1.amazonaws.com/d449d8469620397e6031.jpg'
    }
}

export default uploadDefaultAvatar
