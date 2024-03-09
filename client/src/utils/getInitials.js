function getInitials(fullName) {
    let initials = ''

    const nameArray = fullName.split(' ');
    if(nameArray.length >= 2){
        initials = nameArray[0][0] + nameArray[1][0];
    }else initials = nameArray[0][0] + nameArray[0][1];

    return initials;

};

export default getInitials;