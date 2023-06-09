const getRating = (rating: Number) : String => {
    return rating.toString();
}

const customDate = (date: String) => {
    let n_date = date.split('-');
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    return n_date[2] + ' ' + months[parseInt(n_date[1]) - 1] + ' ' + n_date[0];
}

const getStatus = (status: String, release_date: String) : String => {
    return (status === 'Released') ? 'Sorti le ' + customDate(release_date) : 'A Sortir le ' + release_date;
}

export { getRating, customDate, getStatus}