   $(document).ready(function() {
      // Ganti tampilan input sesuai pilihan
      $('#jenis').change(function() {
        if ($(this).val() === 'luas') {
          $('#inputLuas').show();
          $('#inputKeliling').hide();
        } else {
          $('#inputLuas').hide();
          $('#inputKeliling').show();
        }
        $('#hasil').removeClass('show');
        $('#ukuran').removeClass('show besar sedang kecil');
      });

      $('#btnHitung').click(function() {
        let jenis = $('#jenis').val();
        let hasil = 0;
        let ukuran = "";
        let kelas = "";

        if (jenis === 'luas') {
          let a = parseFloat($('#a').val());
          let b = parseFloat($('#b').val());
          let t = parseFloat($('#t').val());

          if (isNaN(a) || isNaN(b) || isNaN(t)) {
            alert("Harap isi semua nilai alas dan tinggi!");
            return;
          }

          hasil = 0.5 * (a + b) * t;
          $('#hasil').text("Luas Trapesium = " + hasil + " cm²");
        }

        else {
          let ka = parseFloat($('#ka').val());
          let kb = parseFloat($('#kb').val());
          let kc = parseFloat($('#kc').val());
          let kd = parseFloat($('#kd').val());

          if (isNaN(ka) || isNaN(kb) || isNaN(kc) || isNaN(kd)) {
            alert("Harap isi semua sisi untuk keliling!");
            return;
          }

          hasil = ka + kb + kc + kd;
           $('#hasil').text("Keliling Trapesium = " + hasil + " cm");
        }

        if (hasil >= 500) {
          ukuran = "Ukuran Besar";
          kelas = "besar";
        } else if (hasil >= 100) {
          ukuran = "Ukuran Sedang";
          kelas = "sedang";
        } else {
          ukuran = "Ukuran Kecil";
          kelas = "kecil";
        }

        $('#ukuran').text(ukuran).removeClass('besar sedang kecil').addClass(kelas);
        $('#hasil').addClass('show');
        $('#ukuran').addClass('show');
      });
    });