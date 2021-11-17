let endDate = document.querySelector('#date_end');
let contract = document.querySelector('#contract');

contract.addEventListener('change', function(){
  let valeurselectionnee = contract.options[contract.selectedIndex].value;
  if (valeurselectionnee !== 'full-time') {
    endDate.classList.remove('hidden');
    endDate.classList.add('flex');
  } else {
    endDate.classList.add('hidden');
    endDate.classList.remove('flex');
  }
})