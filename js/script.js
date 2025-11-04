// script.js - modular: handles actions across pages.
// Pastikan data.js sudah dimuat sebelum script ini (di semua halaman).
// data.js berisi: dataPengguna, dataKatalogBuku, dataTracking. (Anda upload file tersebut). :contentReference[oaicite:1]{index=1}

(function(){
  // helper
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));
  const formatRupiah = s => s; // data.harga sudah string "Rp ...", so keep as is.

  // set year footers
  $$('span[id^="year"]').forEach(el => el.textContent = new Date().getFullYear());

  // modal helpers
  function openModal(id){
    const m = document.getElementById(id);
    if(m){ m.setAttribute('aria-hidden','false') }
  }
  function closeModal(id){
    const m = document.getElementById(id);
    if(m){ m.setAttribute('aria-hidden','true') }
  }
  document.addEventListener('click', e=>{
    const t = e.target;
    if(t.matches('[data-close]')) closeModal(t.dataset.close);
    if(t.id === 'btn-lupa') openModal('modal-lupa');
    if(t.id === 'btn-daftar') openModal('modal-daftar');
  });

  // global pages
  const bodyId = document.body.id;

  /* ------------------ PAGE: LOGIN ------------------ */
  if(bodyId === 'page-login'){
    const form = $('#login-form');
    form.addEventListener('submit', e=>{
      e.preventDefault();
      const email = $('#email').value.trim();
      const pass = $('#password').value;
      const user = (typeof dataPengguna !== 'undefined') ? dataPengguna.find(u => u.email === email && u.password === pass) : null;
      if(user){
        // simple login simulation: set sessionStorage and redirect to dashboard
        sessionStorage.setItem('user', JSON.stringify({id:user.id,nama:user.nama,email:user.email,role:user.role}));
        window.location.href = 'dashboard.html';
      }else{
        alert('email/password yang anda masukkan salah');
      }
    });

    // lupa password
    $('#lupa-submit').addEventListener('click', ()=>{
      const email = $('#lupa-email').value.trim();
      if(!email){ alert('Masukkan email terlebih dahulu'); return; }
      // simulasi cek
      const found = dataPengguna.find(u => u.email === email);
      if(found) alert('Link reset password (simulasi) telah dikirim ke ' + email);
      else alert('Email tidak ditemukan');
      closeModal('modal-lupa');
    });

    // daftar
    $('#form-daftar').addEventListener('submit', e=>{
      e.preventDefault();
      const nama = $('#daftar-nama').value.trim();
      const email = $('#daftar-email').value.trim();
      const pass = $('#daftar-pass').value;
      if(!nama || !email || !pass){ alert('Lengkapi data pendaftaran'); return; }
      // simulasi: push ke dataPengguna (session only)
      const exists = dataPengguna.some(u=>u.email===email);
      if(exists){ alert('Email sudah terdaftar'); return; }
      const newId = Math.max(...dataPengguna.map(x=>x.id))+1;
      dataPengguna.push({id:newId,nama, email, password:pass, role:'User'});
      alert('Pendaftaran berhasil (simulasi). Silakan login.');
      closeModal('modal-daftar');
    });
  }

  /* ------------------ PAGE: DASHBOARD ------------------ */
  if(bodyId === 'page-dashboard'){
    // greeting by local time
    const now = new Date();
    const hour = now.getHours();
    let greet = 'Selamat';
    if(hour >= 4 && hour < 11) greet = 'Selamat Pagi';
    else if(hour >= 11 && hour < 15) greet = 'Selamat Siang';
    else if(hour >= 15 && hour < 18) greet = 'Selamat Sore';
    else greet = 'Selamat Malam';
    $('#greeting').textContent = `${greet}!`;
    $('#greeting-sub').textContent = `Waktu lokal: ${now.toLocaleString()}`;

    // optionally show user name
    const user = sessionStorage.getItem('user');
    if(user){
      try {
        const u = JSON.parse(user);
        $('#greeting').textContent = `${greet}, ${u.nama}!`;
      } catch(e){}
    }
  }

  /* ------------------ PAGE: STOK / KATALOG ------------------ */
  if(bodyId === 'page-stok'){
    const tbody = document.querySelector('#tabel-katalog tbody');

    function renderKatalog(){
      tbody.innerHTML = '';
      dataKatalogBuku.forEach((b, idx)=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${b.kodeBarang}</td>
          <td><img src="${b.cover}" alt="${b.namaBarang}" style="width:64px;height:64px;object-fit:cover;border-radius:6px"></td>
          <td>${b.namaBarang}</td>
          <td>${b.jenisBarang}</td>
          <td>${b.edisi}</td>
          <td><input type="number" class="stok-input" data-idx="${idx}" value="${b.stok}" min="0"></td>
          <td>${b.harga}</td>
          <td>
            <button class="btn btn-remove" data-idx="${idx}">Hapus</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }
    renderKatalog();

    // listen stok change
    tbody.addEventListener('change', e=>{
      if(e.target.classList.contains('stok-input')){
        const i = +e.target.dataset.idx;
        const val = parseInt(e.target.value) || 0;
        dataKatalogBuku[i].stok = val;
        alert('Stok diupdate untuk ' + dataKatalogBuku[i].namaBarang);
      }
    });

    // hapus
    tbody.addEventListener('click', e=>{
      if(e.target.classList.contains('btn-remove')){
        const i = +e.target.dataset.idx;
        if(confirm('Yakin ingin menghapus ' + dataKatalogBuku[i].namaBarang + '?')){
          dataKatalogBuku.splice(i,1);
          renderKatalog();
        }
      }
    });

    // tambah buku
    $('#form-tambah').addEventListener('submit', e=>{
      e.preventDefault();
      const kode = $('#tb-kode').value.trim();
      const nama = $('#tb-nama').value.trim();
      const jenis = $('#tb-jenis').value.trim();
      const edisi = $('#tb-edisi').value.trim();
      const stok = parseInt($('#tb-stok').value) || 0;
      const harga = $('#tb-harga').value.trim();
      const cover = $('#tb-cover').value.trim();

      if(!kode || !nama){ alert('Isi kode dan nama'); return; }
      dataKatalogBuku.push({
        kodeBarang: kode,
        namaBarang: nama,
        jenisBarang: jenis || 'Buku',
        edisi: edisi || '1',
        stok: stok,
        harga: harga || 'Rp 0',
        cover: cover || 'img/no-cover.png'
      });
      renderKatalog();
      e.target.reset();
      alert('Buku ditambahkan (simulasi).');
    });
  }

  /* ------------------ PAGE: CHECKOUT ------------------ */
  if(bodyId === 'page-checkout'){
    const cartTableBody = document.querySelector('#cart-table tbody');
    const cartTotalEl = $('#cart-total');

    // simulate cart with first 2 buku
    let cart = [];
    if(sessionStorage.getItem('cart')) {
      cart = JSON.parse(sessionStorage.getItem('cart'));
    } else {
      // prefill demo
      cart = dataKatalogBuku.slice(0,2).map((b, idx) => ({kode:b.kodeBarang, nama:b.namaBarang, hargaStr:b.harga, qty:1, idx}));
      sessionStorage.setItem('cart', JSON.stringify(cart));
    }

    function parseRp(str){
      // keep it simple: remove non-digit
      const digits = str.replace(/[^0-9]/g,'');
      return parseInt(digits) || 0;
    }
    function toRp(n){
      return 'Rp ' + n.toLocaleString('id-ID');
    }

    function renderCart(){
      cartTableBody.innerHTML='';
      let total = 0;
      cart.forEach((item, i)=>{
        const hargaNumber = parseRp(item.hargaStr);
        const subtotal = hargaNumber * item.qty;
        total += subtotal;
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${item.nama}</td>
          <td>${item.hargaStr}</td>
          <td><input type="number" min="1" class="cart-qty" data-i="${i}" value="${item.qty}"></td>
          <td>${toRp(subtotal)}</td>
          <td><button class="btn btn-remove" data-i="${i}">Hapus</button></td>
        `;
        cartTableBody.appendChild(tr);
      });
      cartTotalEl.textContent = toRp(total);
      sessionStorage.setItem('cart', JSON.stringify(cart));
    }
    renderCart();

    cartTableBody.addEventListener('change', e=>{
      if(e.target.classList.contains('cart-qty')){
        const i = +e.target.dataset.i;
        const v = parseInt(e.target.value) || 1;
        cart[i].qty = v;
        renderCart();
      }
    });

    cartTableBody.addEventListener('click', e=>{
      if(e.target.classList.contains('btn-remove')){
        const i = +e.target.dataset.i;
        if(confirm('Hapus item?')){
          cart.splice(i,1);
          renderCart();
        }
      }
    });

    $('#form-checkout').addEventListener('submit', e=>{
      e.preventDefault();
      // validation
      const nama = $('#cust-nama').value.trim();
      const email = $('#cust-email').value.trim();
      const alamat = $('#cust-alamat').value.trim();
      const pay = $('#cust-pay').value;
      if(!nama || !email || !alamat || !pay){ alert('Lengkapi semua data pemesanan.'); return; }
      if(cart.length === 0){ alert('Keranjang kosong.'); return; }

      // simulate order completion
      const orderId = 'DO' + Date.now();
      alert(`Pemesanan berhasil!\nNomor pesanan: ${orderId}\nTotal: ${cartTotalEl.textContent}\n(simulasi)`);
      // clear cart
      cart = [];
      sessionStorage.removeItem('cart');
      renderCart();
    });
  }

  /* ------------------ PAGE: TRACKING ------------------ */
  if(bodyId === 'page-tracking'){
    $('#btn-cari').addEventListener('click', ()=>{
      const q = $('#input-do').value.trim();
      if(!q){ alert('Masukkan nomor DO'); return; }
      const found = dataTracking[q];
      if(!found){ alert('Nomor DO tidak ditemukan (simulasi).'); return; }
      $('#hasil-tracking').style.display = 'block';
      $('#ht-do').textContent = found.nomorDO;
      $('#ht-nama').textContent = found.nama;
      $('#ht-status').textContent = found.status;
      $('#ht-ekspedisi').textContent = found.ekspedisi;
      $('#ht-tanggal').textContent = found.tanggalKirim;
      $('#ht-paket').textContent = found.paket;
      $('#ht-total').textContent = found.total;

      const list = $('#ht-list');
      list.innerHTML = '';
      (found.perjalanan || []).forEach(p=>{
        const li = document.createElement('li');
        li.textContent = `${p.waktu} — ${p.keterangan}`;
        list.appendChild(li);
      });
    });
  }

})();
