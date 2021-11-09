function searchWord() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('search_bar');
    filter = input.value.toUpperCase();
    ul = document.getElementById("words_list");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        li_val = li[i];
        txtValue = li_val.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}