import {useState} from 'react';

import Image from "next/image";
import styles from "../../styles/Guitarra.module.css";
import Layout from '../../components/Layout'

const Producto = ({ guitarra,agregarCarrito }) => {
  const [cantidad,setCantidad] = useState(1);
  const {id } = guitarra.data[0];
  const { descripcion, imagen, nombre, precio } = guitarra.data[0].attributes;
  
 const handleSubmit = (e) => {
  e.preventDefault(); 
  if(cantidad<1){
    alert('cantidad no validad');
    return
  }
  //Agregarlo al carrito
  const guitarraSeleccionada = {
    id,
    imagen: imagen.data.attributes.url,
    nombre,
    precio,
    cantidad
  };
  agregarCarrito(guitarraSeleccionada);
 };

  return (
    <Layout pagina={`Guitarra ${nombre}`}>
    <div className={styles.guitarra}>
      <Image
        width={180}
        height={350}
        src={imagen && imagen.data.attributes.url}
        alt={`imagen Guitarra ${nombre}`}
      />
      <div className={styles.contenido}>
        <h3>{nombre}</h3>
        <p className={styles.descripcion}>{descripcion}</p>
        <p className={styles.precio}>${precio}</p>
        <form className={styles.formulario} onSubmit={handleSubmit}> 
          <label>Cantidad:</label>
           <select value={cantidad}
                    onChange={e => setCantidad(parseInt(e.target.value))}
           
           >
            <option value="0">-- Seleccione --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>            
            <option value="7">7</option>
        </select>
        <input   
          type="submit"
          value="Agregar al Carrito"
        
        />
        </form>
       

      </div>
    </div>
    </Layout>
  );
};

export async function getServerSideProps({ query: { url } }) {
  const urlGuitarra = `${process.env.API_URL}/api/guitarras?filters[url]=${url}&populate=imagen`;
  const respuesta = await fetch(urlGuitarra);
  const guitarra = await respuesta.json();
  return {
    props: { guitarra: guitarra },
  };
}
export default Producto;
