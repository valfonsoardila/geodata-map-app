import React, { useState } from "react";

const getStyle = (layout) => {
  switch (layout) {
    case "columnar":
      return {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      };
    case "sequential":
      return {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        height: "100vh",
      };
    case "grid-2-cols":
      return {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "10px",
        height: "100vh",
        padding: "20px",
      };
    case "grid-3-cols":
      return {
        display: "grid",
        gridTemplateColumns: "2fr 1.2fr 1.2fr",
        gap: "10px",
        height: "100vh",
        padding: "20px",
      };
    case "title-over-image":
      return {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
      };
    case "image-left":
      return {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
      };
    case "image-right":
      return {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
      };
    case "overlay":
      return {
        display: "flex",
        position: "relative",
        textAlign: "center",
        height: "100vh",
      };
    case "reverse-columnar":
      return {
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "center",
        height: "100vh",
      };
    case "reverse-sequential":
      return {
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        padding: "20px",
        height: "100vh",
      };
    default:
      return {};
  }
};

const splitDescription = (description) => {
  const words = description.split(" ");
  const midpoint = Math.floor(words.length / 2);
  const firstHalf = words.slice(0, midpoint).join(" ");
  const secondHalf = words.slice(midpoint).join(" ");
  return [firstHalf, secondHalf];
};

const formatDescription = (description) => {
  const lines = description.split("\n").map((line, index) => {
    const isSubtitle = /^\d+\..*:$/.test(line.trim()); // Expresión regular ajustada
    return (
      <p
        key={index}
        style={{
          fontSize: "20px",
          textAlign: "justify",
          fontWeight: isSubtitle ? "bold" : "normal",
          margin: 0,
        }}
      >
        {line}
      </p>
    );
  });
  return lines;
};

function Section({ title, description, image, layout, component }) {
  const gridStyle = getStyle(layout);
  const [firstHalf, secondHalf] = splitDescription(description);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="section" style={gridStyle}>
      {layout === "columnar" ? (
        <>
          <h2>{title}</h2>
          {formatDescription(description)}
          {image ? (
            <img
              src={image}
              alt="img"
              style={{ width: "auto", height: "-webkit-fill-available" }}
            />
          ) : (
            <div style={{ width: "100%", height: "100%" }}>{component}</div>
          )}
        </>
      ) : layout === "sequential" ? (
        <>
          {
            //Si imagen es diferente de null, entonces se muestra la imagen sino renderiza el componente
            image ? (
              <img
                src={image}
                alt="img"
                style={{
                  width: isHovered ? "80%" : "70%",
                  transition: "width 0.3s ease",
                  boxShadow: isHovered
                    ? "0px 0px 10px 5px rgba(0,0,0,0.5)"
                    : "none",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            ) : (
              <div style={{ width: "80%", height: "100%" }}>{component}</div>
            )
          }
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "30%",
              alignItems: "center",
            }}
          >
            <h2 style={{ fontSize: "40px" }}>{title}</h2>
            {formatDescription(description)}
          </div>
        </>
      ) : layout === "grid-2-cols" ? (
        <>
          {
            //Si imagen es diferente de null, entonces se muestra la imagen sino renderiza el componente
            image ? (
              <img
                src={image}
                alt="img"
                style={{
                  width: isHovered ? "100%" : "90%",
                  transition: "width 0.3s ease",
                  boxShadow: isHovered
                    ? "0px 0px 10px 5px rgba(0,0,0,0.5)"
                    : "none",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            ) : (
              <div style={{ width: "100%", height: "100%" }}>{component}</div>
            )
          }
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2>{title}</h2>
            {formatDescription(description)}
          </div>
        </>
      ) : layout === "grid-3-cols" ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {
              //Si imagen es diferente de null, entonces se muestra la imagen sino renderiza el componente
              image ? (
                <img
                  src={image}
                  alt="img"
                  style={{
                    width: isHovered ? "100%" : "90%",
                    transition: "width 0.3s ease",
                    boxShadow: isHovered
                      ? "0px 0px 10px 5px rgba(0,0,0,0.5)"
                      : "none",
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                />
              ) : (
                <div style={{ width: "100%", height: "100%" }}>{component}</div>
              )
            }
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "0px 30px",
              padding: "100px 0px",
            }}
          >
            <h2 style={{ fontSize: "40px", margin: "0px" }}>{title}</h2>
            {formatDescription(firstHalf)}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "0px 10px",
            }}
          >
            {formatDescription(secondHalf)}
          </div>
        </>
      ) : layout === "title-over-image" ? (
        <>
          <h2>{title}</h2>
          {
            //Si imagen es diferente de null, entonces se muestra la imagen sino renderiza el componente
            image ? (
              <img
                src={image}
                alt="img"
                style={{
                  width: isHovered ? "100%" : "90%",
                  transition: "width 0.3s ease",
                  boxShadow: isHovered
                    ? "0px 0px 10px 5px rgba(0,0,0,0.5)"
                    : "none",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            ) : (
              <div style={{ width: "100%", height: "100%" }}>{component}</div>
            )
          }
          {formatDescription(description)}
        </>
      ) : layout === "image-left" ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "60%",
              alignItems: "center",
            }}
          >
            <h2>{title}</h2>
            {
              //Si imagen es diferente de null, entonces se muestra la imagen sino renderiza el componente
              image ? (
                <img
                  src={image}
                  alt="img"
                  style={{
                    width: isHovered ? "80%" : "70%",
                    transition: "width 0.3s ease",
                    boxShadow: isHovered
                      ? "0px 0px 10px 5px rgba(0,0,0,0.5)"
                      : "none",
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                />
              ) : (
                <div style={{ width: "100%", height: "100%" }}>{component}</div>
              )
            }
          </div>
          {formatDescription(description)}
        </>
      ) : layout === "image-right" ? (
        <>
          {formatDescription(description)}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "-webkit-fill-available",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h2>{title}</h2>
            {
              //Si imagen es diferente de null, entonces se muestra la imagen sino renderiza el componente
              image ? (
                <img
                  src={image}
                  alt="img"
                  style={{
                    width: isHovered ? "80%" : "70%",
                    transition: "width 0.3s ease",
                    boxShadow: isHovered
                      ? "0px 0px 10px 5px rgba(0,0,0,0.5)"
                      : "none",
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                />
              ) : (
                <div style={{ width: "100%", height: "100%" }}>{component}</div>
              )
            }
          </div>
        </>
      ) : layout === "overlay" ? (
        <>
          {
            //Si imagen es diferente de null, entonces se muestra la imagen sino renderiza el componente
            image ? (
              <img
                src={image}
                alt="img"
                style={{
                  width: "-webkit-fill-available",
                  height: "100%",
                  backgroundAttachment: "fixed",
                  backgroundSize: "cover",
                  imageRendering: "-webkit-optimize-contrast",
                  imageResolution: "from-image",
                }}
              />
            ) : (
              <div style={{ width: "100%", height: "100%" }}>{component}</div>
            )
          }
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <h2 style={{ fontSize: "100px" }}>{title}</h2>
            <p
              style={{
                fontSize: "40px",
                backgroundColor: "rgba(255,255,255,0.6)",
                border: "0.5px solid rgba(0,0,0,0.5)",
                borderRadius: "10px",
              }}
            >
              {description}
            </p>
          </div>
        </>
      ) : layout === "reverse-columnar" ? (
        <>
          <h2>{title}</h2>
          {formatDescription(description)}
          <img
            src={image}
            alt="img"
            style={{
              width: isHovered ? "100%" : "90%",
              transition: "width 0.3s ease",
              boxShadow: isHovered
                ? "0px 0px 10px 5px rgba(0,0,0,0.5)"
                : "none",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
          {
            //Si imagen es diferente de null, entonces se muestra la imagen sino renderiza el componente
            image ? (
              <img
                src={image}
                alt="img"
                style={{ width: "auto", height: "-webkit-fill-available" }}
              />
            ) : (
              <div style={{ width: "100%", height: "100%" }}>{component}</div>
            )
          }
        </>
      ) : layout === "reverse-sequential" ? (
        <>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2>{title}</h2>
            {formatDescription(description)}
          </div>
          {
            //Si imagen es diferente de null, entonces se muestra la imagen sino renderiza el componente
            image ? (
              <img
                src={image}
                alt="img"
                style={{
                  width: isHovered ? "60%" : "50%",
                  transition: "width 0.3s ease",
                  boxShadow: isHovered
                    ? "0px 0px 10px 5px rgba(0,0,0,0.5)"
                    : "none",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            ) : (
              <div style={{ width: "100%", height: "100%" }}>{component}</div>
            )
          }
        </>
      ) : (
        <>
          <h2>{title}</h2>
          {formatDescription(description)}
          <img
            src={image}
            alt="img"
            style={{ width: "auto", height: "-webkit-fill-available" }}
          />
          {
            //Si imagen es diferente de null, entonces se muestra la imagen sino renderiza el componente
            image ? (
              <img
                src={image}
                alt="img"
                style={{
                  width: isHovered ? "100%" : "90%",
                  transition: "width 0.3s ease",
                  boxShadow: isHovered
                    ? "0px 0px 10px 5px rgba(0,0,0,0.5)"
                    : "none",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            ) : (
              <div style={{ width: "100%", height: "100%" }}>{component}</div>
            )
          }
        </>
      )}
    </div>
  );
}

export default Section;
