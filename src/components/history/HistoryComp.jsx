import './HistoryComp.css';
import wasteland from '../../assets/img/Wasteland.webp'; 
function HistoryComp() {
  return (
    <section className="history-comp">
      <h1>NUESTRA HISTORIA</h1>
      <p className="history-fecha">50 AÑOS DE SANGRE, SUDOR Y ÓXIDO</p>

      <p className="history-texto">
        El colapso no fue un evento único, fue un desgarro lento y doloroso.
        Las fábricas se silenciaron, los cielos se tiñeron del color de la
        sangre seca, y la producción, tal como la conocíamos, cesó. En el
        Valhalla del Chatarrero, no lloramos por el mundo perdido;
        reconstruimos sobre sus cadáveres de acero. Hace cinco décadas, los
        primeros Recolectores entendieron una verdad fundamental: la
        supervivencia no está en crear, sino en recuperar.
      </p>

      <p className="history-texto">
        Nuestra filosofía es brutalmente simple. Cada pieza de engranaje,
        cada máscara de gas filtrada, cada bota de cuero reseco tiene un
        linaje. Han sobrevivido al fuego, a las tormentas ácidas y al
        tiempo. Nosotros no fabricamos; nosotros rescatamos, reparamos y
        reforzamos. El óxido no es deterioro, es una cicatriz de honor.
      </p>

      <figure className="archivo-imagen">
        <img src={wasteland} alt="Primeras rutas de recolección" />
        <figcaption>SECTOR 4: LAS PRIMERAS RUTAS DE RECOLECCIÓN (AÑO 12)</figcaption>
      </figure>

     
    </section>
  );
}

export default HistoryComp;