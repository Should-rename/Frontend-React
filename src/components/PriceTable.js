// import React from 'react'
// import add from '@/css/images/profile/add.svg';
// import deleteBtn from '@/css/images/profile/delete.svg';
//
// const PriceTable = () => {
//     const token = localStorage.Authentication;
//
//     const priceTable = props.currentUser.services.map((service) =>
//         <tr key={service.name+service.price+Math.random()}>
//             <td className='price-table__column-1'>{service.name}</td>
//             <td className='price-table__column-2'>{service.price}</td>
//             <td className='price-table__column-3'>
//                 <img src={deleteBtn} alt='delete' onClick={(event) => deleteService(event)}/>
//             </td>
//         </tr>
//     )
//
//     const updateCurrentUser = () => {
//         fetch('http://localhost:8080/current_user', {
//             method: "GET",
//             headers: {
//                 'Content-Type': 'application/json',
//                 Accept: 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//             .then(resp => resp.json())
//             .then(data => {
//                 if (data.message) {
//                     //недействительный токен
//                     localStorage.removeItem('Authentication');
//                 } else {
//                     props.setCurrentUser(data);
//                 }
//             })
//     }
//
//     const addService = (name, price) => {
//         fetch(`http://localhost:8080/users/${props.currentUser.id}/add_service`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({
//                 name,
//                 price
//             })
//         })
//             .then(response => {
//                 if (response.ok) {
//                     updateCurrentUser();
//                 } else {
//                     console.log('ERR', response);
//                 }
//             })
//     }
//
//     const deleteService = event => {
//         let td = event.currentTarget.parentElement.previousElementSibling.previousElementSibling;
//         let serviceName = td.innerHTML;
//
//         fetch(`http://localhost:8080/users/${props.currentUser.id}/delete_service/${serviceName}`, {
//             method: 'DELETE',
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//             .then(response => {
//                 if (response.ok) {
//                     updateCurrentUser();
//                 } else {
//                     console.log('ERR', response)
//                 }
//             })
//     }
//
//     return (
//         <table className='price-table'>
//             <tbody>
//             <tr>
//                 <th className="price-table__column-1 title">услуга</th>
//                 <th className="price-table__column-2 title">стоимость</th>
//             </tr>
//
//             {props.currentUser.services ? priceTable : ''}
//
//             <tr>
//                 <td id='name' className="price-table__column-1" contentEditable='true'> </td>
//                 <td id='price' className="price-table__column-2" contentEditable='true'> </td>
//                 <td className='price-table__column-3'>
//                     <img
//                         src={add}
//                         alt='add'
//                         onClick={() =>
//                             addService(document.getElementById('name').innerHTML, document.getElementById('price').innerHTML)}
//                     />
//                 </td>
//             </tr>
//             </tbody>
//         </table>
//     );
// }
//
// export default PriceTable