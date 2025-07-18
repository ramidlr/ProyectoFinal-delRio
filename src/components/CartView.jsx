import  '../css/CartView.css'
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Swal from 'sweetalert2'

const CartView = () => {
    const { cart, deleteCart, removeItem, finalPrice } = useContext(CartContext);
    const preConfirm = () => {
        Swal.fire({
            title: 'Estas seguro que queres borrar el carrito?',
            showDenyButton:true,
            confirmButtonText: 'Si',
            denyButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCart()
                Swal.fire('Carrito borrado', '', 'success')
            }else if (result.isDenied) {
                Swal.fire('No se borro el carrito', '', 'info')
            }
        })
    }
    return (
        <div className="d-flex flex-column align-items-center text-center min-vh-100">
            <h2 className="fw-bold mt-4 mb-4">Ya casi has finalizado tu compra</h2>
            
            <div>
                {
                    cart.map((compra) => (
                        <div key={compra.id} className="text-center p-4 border rounded mb-4">
                            <img 
                                src={compra.img} 
                                alt={compra.name} 
                                className="img-fluid mx-auto d-block mb-3 compra-img"
                            />

                            <h5 className="fw-bold">{compra.name}</h5>
                            <p>Precio unitario: ${compra.price},00</p>
                            <p>Cantidad: {compra.quantity}</p>
                            <div className="d-flex justify-content-center gap-2 mt-3">
                                <button className="btn btn-warning" onClick={() => removeItem(compra.id)}>Eliminar</button>
                            </div>
                        </div>                        
                    ))
                }
            </div>

            <span className="fw-bold">Total a pagar: ${finalPrice()}</span>
            <div className='text-center p-3 border rounded mb-4 mt-4'>
                <Link className="btn btn-success me-2" to="/checkout">Terminar compra</Link>
                <button className="btn btn-danger" onClick={preConfirm}>Vaciar carrito</button>
            </div>
        </div>
    );
}

export default CartView