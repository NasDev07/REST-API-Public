function searchMovie() {
    $('#movie-list').html(''); // untuk menghapus isi dari list dan akan menampilkan hasil pencarian

    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '70fdcf64',
            's': $('#search-input').val()
        },
        success: function(result) {
            //console.log(result); //  untuk test data yang diterima dari server API OMDb API, lihat di console
            if (result.Response == "True"){
                let movies = result.Search;
                //console.log(movies); // untuk test data yang diterima dari server API OMDb API, lihat di console
                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                    <div class="col-md-4">
                        <div class="card md-3">
                            <img src="`+ data.Poster +`" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">`+ data.Title +`</h5>
                                <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
                                <a href="#" class="card-link see-detail"  data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+ data.imdbID +`">See Detail</a>
                            </div>
                        </div>
                    </div>
                    `)
                });

                $('#search-input').val(''); // untuk mengganti value input menjadi kosong sesudah data ditampilkan

            }else {
                $('#movie-list').html(`
                <h1 class="text-center">`+ result.Error +`</h1>
                `);
            }
        }
    });
};


$('#search-button').on('click', function() { // ketika tombol search diklik
    searchMovie();
});

$('#search-input').on('keyup', function(e) {  // untuk supaya bisa di klik cengan enter
    if(e.keyCode === 13) {
        searchMovie();
    }
});

$('#movie-list').on('click', '.see-detail', function() {  // ketika tombol see detail diklik tapilkan data detail dari movie
    //console.log($(this).data('id')); // untuk test data id dari movie yang diklik tapilkan di console log untuk dapat di cek di console log di browser

    $.ajax({
        url: 'http://omdbapi.com',
        dataType: 'json',
        type: 'get',
        data: {
            'apikey': '70fdcf64',
            'i': $(this).data('id')
        },
        success: function(movie) {
            if( movie.Response === "True") {
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+ movie.Poster +`" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>`+ movie.Title +`</h3></li>
                                    <li class="list-group-item">Released : `+ movie.Released +`</li>
                                    <li class="list-group-item">Genre : `+ movie.Genre +`</li>
                                    <li class="list-group-item">Director : `+ movie.Actors +`</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `)
            }
        }
    });
});