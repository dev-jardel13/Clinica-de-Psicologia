
document.querySelectorAll('.sexo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.sexo-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        document.getElementById('sexoInput').value = btn.dataset.value;
    });
});

document.querySelectorAll('.tipo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tipo-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        document.getElementById('tipoInput').value = btn.dataset.value;
        document.getElementById('campoCrp').style.display =
            btn.dataset.value === 'colaborador' ? 'block' : 'none';
    });
});