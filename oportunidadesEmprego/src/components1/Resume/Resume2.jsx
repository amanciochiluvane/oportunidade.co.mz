import  { forwardRef, useEffect, useRef, useState } from "react";
import {
  AtSign,
  Calendar,
  GitHub,
  Linkedin,
  MapPin,
  Paperclip,
  Phone,
} from "react-feather";

import "./Resume1.css"

import triangulo from "../../assets/Triangulo.png"
const Resume = forwardRef((props, ref) => {
  const information = props.information;
  const sections = props.sections;
  const containerRef = useRef();

  const [columns, setColumns] = useState([[], []]);
  const [source, setSource] = useState("");
  const [target, seTarget] = useState("");

  const info = {
    workExp: information[sections.workExp],
    project: information[sections.project],
    achievement: information[sections.achievement],
    education: information[sections.education],
    basicInfo: information[sections.basicInfo],
    summary: information[sections.summary],
    other: information[sections.other],
  };

  const getFormattedDate = (value) => {
    if (!value) return "";
    const date = new Date(value);

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const sectionDiv = {
    [sections.workExp]: (
      <div
        key={"workexp"}
        draggable
        onDragOver={() => seTarget(info.workExp?.id)}
        onDragEnd={() => setSource(info.workExp?.id)}
      >
        <h2 className="Title2parteResumoCV1">{info.workExp.sectionTitle}</h2>
        <div>
          {info.workExp?.details?.map((item) => (
            <div key={item.title}>

              {item.title ? <article className="IntroExperienciaParte2ResuoCV1"> <p className="Positionparte2ResumoCV1">{item.title}</p> {item.startDate && item.endDate ? (
                <div className="Paragrafo2parteResumoCV1">
                   {getFormattedDate(item.startDate)}-
                  {getFormattedDate(item.endDate)}
                </div>
              ) : (
                <div />
              )} </article> : <span />}
              {item.companyName ? <p className="Companyparte2ResumoCV1">{item.companyName}</p> : <span />}
            
              
              
              {item.points?.length > 0 ? (
                <ul className="Paragrafo2parteResumoCV1">
                  {item.points?.map((elem, index) => (
                    <li className="Paragrafo2parteResumoCV1" key={elem + index}>{elem}</li>
                  ))}
                </ul>
              ) : (
                <span />
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.project]: (
      <div
        key={"project"}
        draggable
        onDragOver={() => seTarget(info.project?.id)}
        onDragEnd={() => setSource(info.project?.id)}
      >
        <h2 className="TituloContacto">{info.project.sectionTitle}</h2>
        <div>
          {info.project?.details?.map((item) => (
            <div key={item.title} className="ContactoLinks1" >
              {item.title ? <p className="ContactoLinks1SubTitle">{item.title}</p> : <span />}
              {item.link ? (
                <a href={item.link} className="ContactoLinksDiv1Link">
                  <Paperclip />
                  <p >{item.link}</p>
                  
                </a>
              ) : (
                <span />
              )}
              {item.github ? (
                <a href={item.github} className="ContactoLinksDiv1Link">
                  <GitHub />
                  <p>{item.github}</p>
                </a>
              ) : (
                <span />
              )}
              {item.overview ? <p className="TextoProjectoResumoCV1" >{item.overview} </p> : <span />}
              {item.points?.length > 0 ? (
                <ul className="TextoProjectoResumoCV1">
                  {item.points?.map((elem, index) => (
                    <li className="TextoProjectoResumoCV1" key={elem + index}>{elem}</li>
                  ))}
                </ul>
              ) : (
                <span />
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.education]: (
      <div
        key={"education"}
        draggable
        onDragOver={() => seTarget(info.education?.id)}
        onDragEnd={() => setSource(info.education?.id)}
      >
        <h2 className="TituloContacto">{info.education?.sectionTitle}</h2>
        <div>
          {info.education?.details?.map((item) => (
            <div  className="ContactoLinks1" key={item.title}>
              {item.title ? <p className="ContactoLinks1SubTitle">{item.title}</p> : <span />}
              {item.college ? <p className="TextoProjectoResumoCV1">{item.college}</p> : <span />}
              {item.startDate && item.endDate ? (
                <div className="ContactoLinksDiv1Link">
                  <Calendar /> {getFormattedDate(item.startDate)} -
                  {getFormattedDate(item.endDate)}
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.achievement]: (
      <div
        key={"achievement"}
        draggable
        onDragOver={() => seTarget(info.achievement?.id)}
        onDragEnd={() => setSource(info.achievement?.id)}
      >
        <h2 className="Title2parteResumoCV1">{info.achievement?.sectionTitle}</h2>
        <div>
          {info.achievement?.points?.length > 0 ? (
            <ul className="Paragrafo2parteResumoCV1">
              {info.achievement?.points?.map((elem, index) => (
                <li className="Paragrafo2parteResumoCV1" key={elem + index}>{elem}</li>
              ))}
            </ul>
          ) : (
            <span />
          )}
        </div>
      </div>
    ),
    [sections.summary]: (
      <div
        key={"summary"}
        draggable
        onDragOver={() => seTarget(info.summary?.id)}
        onDragEnd={() => setSource(info.summary?.id)}
      >
        <h2 className="Title2parteResumoCV1">{info.summary?.sectionTitle}</h2>
        <div>
          <p className="Paragrafo2parteResumoCV1">{info.summary?.detail}</p>
        </div>
      </div>
    ),
    [sections.other]: (
      <div
        key={"other"}
        draggable
        onDragOver={() => seTarget(info.other?.id)}
        onDragEnd={() => setSource(info.other?.id)}
      >
        <h2 className="Title2parteResumoCV1">{info.other?.sectionTitle}</h2>
        <div>
          <p className="Paragrafo2parteResumoCV1">{info?.other?.detail}</p>
        </div>
      </div>
    ),
  };
  

  const swapSourceTarget = (source, target) => {
    if (!source || !target) return;
    const tempColumns = [[...columns[0]], [...columns[1]]];

    let sourceRowIndex = tempColumns[0].findIndex((item) => item === source);
    let sourceColumnIndex = 0;
    if (sourceRowIndex < 0) {
      sourceColumnIndex = 1;
      sourceRowIndex = tempColumns[1].findIndex((item) => item === source);
    }

    let targetRowIndex = tempColumns[0].findIndex((item) => item === target);
    let targetColumnIndex = 0;
    if (targetRowIndex < 0) {
      targetColumnIndex = 1;
      targetRowIndex = tempColumns[1].findIndex((item) => item === target);
    }

    const tempSource = tempColumns[sourceColumnIndex][sourceRowIndex];
    tempColumns[sourceColumnIndex][sourceRowIndex] =
      tempColumns[targetColumnIndex][targetRowIndex];

    tempColumns[targetColumnIndex][targetRowIndex] = tempSource;

    setColumns(tempColumns);
  };

  useEffect(() => {
    setColumns([
      [sections.project, sections.education],
      [sections.summary, sections.workExp, sections.achievement, sections.other],
    ]);
  }, []);

  useEffect(() => {
    swapSourceTarget(source, target);
  }, [source]);

  useEffect(() => {
    const container = containerRef.current;
    if (!props.activeColor || !container) return;

    container.style.setProperty("--color", props.activeColor);
  }, [props.activeColor]);

  return (
    <div className="ResumoCV1MAE">

    <div ref={ref} >
      <div ref={containerRef} className="ResumoCv1">

        <section className="ResumoCV1Parte1">

            <img loading="lazy"src={triangulo} className="Triangulo" />
            
            <article>
              
            
            <h2 className="TituloContacto">Contacte-me</h2>
            <div className="ContactoLinks1">
              {info.basicInfo?.detail?.email ? (
                <a className="ContactoLinksDiv1Link" type="email">
                  <AtSign /><p> {info.basicInfo?.detail?.email}</p>
                </a>
              ) : (
                <span />
              )}
              {info.basicInfo?.detail?.phone ? (
                <a className="ContactoLinksDiv1Link">
                  <Phone /> <p>{info.basicInfo?.detail?.phone}</p>
                </a>
              ) : (
                <span />
              )}
              {info.basicInfo?.detail?.linkedin ? (
                <a className="ContactoLinksDiv1Link">
                  <Linkedin /> <p>{info.basicInfo?.detail?.linkedin}</p>
                </a>
              ) : (
                <span />
              )}
              {info.basicInfo?.detail?.github ? (
                <a className="ContactoLinksDiv1Link">
                  <GitHub /> {info.basicInfo?.detail?.github}
                </a>
              ) : (
                <span />
              )}
            </div>

            <div >
            {columns[0].map((item) => sectionDiv[item])}
          </div>
          </article>
         
        </section>

                
        <section className="ResumoCV1Parte2">
            <div className="HeaderResumo1">
              <p className="NomeResumo1">{info.basicInfo?.detail?.name}</p>
              <p className="ProfissaoResumo1">{info.basicInfo?.detail?.title}</p>
            </div>

            <div className="parte2ResumoCv1Divs" >
            {columns[1].map((item) => sectionDiv[item])}
          </div>
        </section>
       
  
      </div>
    </div>

    </div>
  );
});

export default Resume;
