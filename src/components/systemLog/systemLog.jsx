import "./systemLog.css";

const SystemLog = () => {
  return (
    <section className="logWrapper" aria-labelledby="system-log-title">
      <div className="sectionHeaderRow">
        <div>
          <p className="sectionKicker">DIAGNÓSTICO // UPLINK 7G</p>
          <h3 id="system-log-title" className="sectionHeader">REGISTRO DE SUBSISTEMA</h3>
        </div>
        <span className="systemState"><i /> INESTABLE</span>
      </div>
      <div className="terminalBox" data-label="LIVE FEED">
        <div className="signalNoise" />
        <div className="terminalHeader">
          <span>SYS.OP. TERMINAL V2.4 // SECTOR 4G</span>
        </div>
        <div className="terminalContent">
          <p className="logLine">&gt; Inicializando protocolo de arranque ... <b>[OK]</b></p>
          <p className="logLine">&gt; Conectando con nodos de inventario periféricos <b>[OK]</b></p>
          <p className="warningText logLine">
            &gt; Verificando niveles de radiación externa... ADVERTENCIA:
            Niveles elevados en sector 4G.
          </p>
          <p className="logLine">&gt; Actualización de mercado recibida. <b>[OK]</b></p>
          <p className="logLine">
            &gt; Carga de chatarra pesada detectada en ruta. Llegada estimada:
            04:00 horas.
          </p>
          <p className="logLine glitchLine">
            &gt; Solicitando credenciales de acceso API para listado completo...
          </p>
          <p className="errorText logLine">
            &gt; ERROR: Timeout en conexión con base de datos. Reintentando...
          </p>
          <p className="cursorPrompt">
            C:\CHATARRERO\SYS&gt; <span className="blinkingCursor">_</span>
          </p>
        </div>
        <div className="terminalFooter">
          <span>AMENAZA <b>ALTA</b></span>
          <span>PÉRDIDA DE PAQUETES <b>37%</b></span>
          <span className="activityMeter" aria-label="Actividad del sistema"><i /><i /><i /><i /><i /><i /><i /><i /></span>
        </div>
      </div>
    </section>
  );
};

export default SystemLog;
