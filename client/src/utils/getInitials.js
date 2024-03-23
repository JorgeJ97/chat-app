function getInitials(fullName) {
    let initials = ''

    const nameArray = fullName.split(' ').filter(name => name !== '');
    if(nameArray.length >= 2){
        initials = nameArray[0][0] + nameArray[1][0];
    }else initials = nameArray[0][0] + nameArray[0][1];

    return initials.toUpperCase();

};

export default getInitials;