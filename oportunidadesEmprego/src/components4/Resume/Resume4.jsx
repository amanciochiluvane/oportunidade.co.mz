/* eslint-disable react/prop-types */
import { forwardRef, useEffect, useRef, useState } from "react";
import {
  AtSign,
  Calendar,
  GitHub,
  Linkedin,
  Paperclip,
  Phone,
} from "react-feather";

import "./Resume4.css";

// eslint-disable-next-line react/display-name
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
        <h2 className="Title4parteResumoCV4">{info.workExp.sectionTitle}</h2>
        <div>
          {info.workExp?.details?.map((item) => (
            <div key={item.title}>
              {item.title ? (
                <article className="IntroExperienciaParte4ResuoCV4">
                  <p className="Positionparte4ResumoCV4">{item.title}</p>{" "}
                  {item.startDate && item.endDate ? (
                    <div className="Paragrafo4parteResumoCV4">
                      {getFormattedDate(item.startDate)}-
                      {getFormattedDate(item.endDate)}
                    </div>
                  ) : (
                    <div />
                  )}{" "}
                </article>
              ) : (
                <span />
              )}
              {item.companyName ? (
                <p className="Companyparte4ResumoCV4">{item.companyName}</p>
              ) : (
                <span />
              )}

              {item.points?.length > 0 ? (
                <ul className="Paragrafo4parteResumoCV4">
                  {item.points?.map((elem, index) => (
                    <li className="Paragrafo4parteResumoCV4" key={elem + index}>
                      {elem}
                    </li>
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
        <h2 className="TituloContacto4">{info.project.sectionTitle}</h2>
        <div>
          {info.project?.details?.map((item) => (
            <div key={item.title} className="ContactoLinks4">
              {item.title ? (
                <p className="ContactoLinks4SubTitle">{item.title}</p>
              ) : (
                <span />
              )}
              {item.link ? (
                <a href={item.link} className="ContactoLinksDiv4Link">
                  <Paperclip />
                  <p>{item.link}</p>
                </a>
              ) : (
                <span />
              )}
              {item.github ? (
                <a href={item.github} className="ContactoLinksDiv4Link">
                  <GitHub />
                  <p>{item.github}</p>
                </a>
              ) : (
                <span />
              )}
              {item.overview ? (
                <p className="TextoProjectoResumoCV4">{item.overview} </p>
              ) : (
                <span />
              )}
              {item.points?.length > 0 ? (
                <ul className="TextoProjectoResumoCV4">
                  {item.points?.map((elem, index) => (
                    <li className="TextoProjectoResumoCV4" key={elem + index}>
                      {elem}
                    </li>
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
        <h2 className="TituloContacto4">{info.education?.sectionTitle}</h2>
        <div>
          {info.education?.details?.map((item) => (
            <div className="ContactoLinks4" key={item.title}>
              {item.title ? (
                <p className="ContactoLinks4SubTitle">{item.title}</p>
              ) : (
                <span />
              )}
              {item.college ? (
                <p className="TextoProjectoResumoCV4">{item.college}</p>
              ) : (
                <span />
              )}
              {item.startDate && item.endDate ? (
                <div className="ContactoLinksDiv4Link">
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
        <h2 className="Title4parteResumoCV4">{info.achievement?.sectionTitle}</h2>
        <div>
          {info.achievement?.points?.length > 0 ? (
            <ul className="Paragrafo4parteResumoCV4">
              {info.achievement?.points?.map((elem, index) => (
                <li className="Paragrafo4parteResumoCV4" key={elem + index}>
                  {elem}
                </li>
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
        <h2 className="Title4parteResumoCV4">{info.summary?.sectionTitle}</h2>
        <div>
          <p className="Paragrafo4parteResumoCV4">{info.summary?.detail}</p>
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
        <h2 className="Title4parteResumoCV4">{info.other?.sectionTitle}</h2>
        <div>
          <p className="Paragrafo3parteResumoCV4">{info?.other?.detail}</p>
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
    if (sourceRowIndex < 0) {
      sourceColumnIndex = 2;
      sourceRowIndex = tempColumns[2].findIndex((item) => item === source);
    }

    let targetRowIndex = tempColumns[0].findIndex((item) => item === target);
    let targetColumnIndex = 0;
    if (targetRowIndex < 0) {
      targetColumnIndex = 1;
      targetRowIndex = tempColumns[1].findIndex((item) => item === target);
    }
    if (targetRowIndex < 0) {
      targetColumnIndex = 2;
      targetRowIndex = tempColumns[2].findIndex((item) => item === target);
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
      [sections.summary,sections.workExp, sections.achievement, sections.other],
    ]);
  }, [sections]);

  useEffect(() => {
    swapSourceTarget(source, target);
  }, [source]);

  useEffect(() => {
    const container = containerRef.current;
    if (!props.activeColor || !container) return;

    container.style.setProperty("--color", props.activeColor);
  }, [props.activeColor]);

  return (
  <div className="ResumoCV4MAE">

    <div ref={ref}>
      <div ref={containerRef} className="ResumoCv4">
        <section className="ResumoCV4Parte1">
            
            <h2 className="TituloContacto4">Contacte-me</h2>
            <div className="ContactoLinks4">
            {info.basicInfo?.detail?.email ? (
              <a
                className="ContactoLinksDiv4Link"
                type="email"
                href={"mailto:" + info.basicInfo?.detail?.email}
              >
                <AtSign />
                <p>{info.basicInfo?.detail?.email}</p>
              </a>
            ) : (
              <span />
            )}
            {info.basicInfo?.detail?.phone ? (
              <a
                className="ContactoLinksDiv4Link"
                type="phone"
                href={"tel:" + info.basicInfo?.detail?.phone}
              >
                <Phone />
                <p>{info.basicInfo?.detail?.phone}</p>
              </a>
            ) : (
              <span />
            )}
            {info.basicInfo?.detail?.linkedin ? (
              <a
                className="ContactoLinksDiv4Link"
                href={info.basicInfo?.detail?.linkedin}
              >
                <Linkedin />
                <p>{info.basicInfo?.detail?.linkedin}</p>
              </a>
            ) : (
              <span />
            )}
            {info.basicInfo?.detail?.github ? (
              <a
                className="ContactoLinksDiv4Link"
                href={info.basicInfo?.detail?.github}
              >
                <GitHub />
                <p>{info.basicInfo?.detail?.github}</p>
              </a>
            ) : (
              <span />
            )}
            </div>
            <section className="ResumoCV4Parte12">
              <div className="parte2ResumoCv4Divs">
                { columns[0].map((item) => sectionDiv[item])}
              </div>
            </section>
           
        </section>

        <section className="ResumoCV4Parte2">
        
                <div className="HeaderResumo4">
                  <p className="NomeResumo4">{info.basicInfo?.detail?.name}</p>
                  <p className="ProfissaoResumo4">{info.basicInfo?.detail?.title}</p>
                </div>
           
            <div className="parte1ResumoCv4Divs">
                {columns[1].map((item) => sectionDiv[item])}
              </div>
        </section>

        </div>
  
      </div>
    </div>
   
  );
});

export default Resume;


