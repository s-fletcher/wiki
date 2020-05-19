import styled from "styled-components";
import animateScrollTo from "animated-scroll-to";

const ToC = styled.div`
    color: rgb(122, 122, 122);
    margin-bottom: 30px;
    .toc-2 {
        margin-left: 20px;
    }
    .toc-3 {
        margin-left: 40px;
    }
    .toc-item {
        cursor: pointer;
        display: inline-block;
    }
    .toc-item:hover {
        text-decoration: underline;
    }
`;

function goTo(event, tag) {
    for (var element of document
        .getElementsByClassName("tox-edit-area__iframe")[0]
        .contentWindow.document.getElementsByTagName(tag)) {
        if (element.textContent === event.target.textContent) {
            var scrollToPosition = element.offsetTop + 200;
            animateScrollTo(scrollToPosition, {
                maxDuration: 500,
                minDuration: 500,
            });
        }
    }
}

function renderToC(content) {
    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(content, "text/html");
    var result = [];
    var level;
    // Iterates through text and assigns column
    for (var item of htmlDoc.getElementsByTagName("*")) {
        if (item.innerHTML === "<br>") {
            continue;
        }
        if (item.tagName === "H1") {
            result.push(
                <div key={Math.random()}>
                    <p onClick={(e) => goTo(e, "h1")} className="toc-1 toc-item">
                        {item.textContent}
                    </p>
                </div>
            );
            level = 1;
        } else if (item.tagName === "H2") {
            if (level === 1 || level === 2 || level === 3) {
                result.push(
                    <div key={Math.random()}>
                        <p onClick={(e) => goTo(e, "h2")} className="toc-2 toc-item">
                            {item.textContent}
                        </p>
                    </div>
                );
                level = 2;
            } else {
                result.push(
                    <div key={Math.random()}>
                        <p onClick={(e) => goTo(e, "h2")} className="toc-1 toc-item">
                            {item.textContent}
                        </p>
                    </div>
                );
                level = 0;
            }
        } else if (item.tagName === "H3") {
            if (level === 0 || level === 1) {
                result.push(
                    <div key={Math.random()}>
                        <p onClick={(e) => goTo(e, "h3")} className="toc-2 toc-item">
                            {item.textContent}
                        </p>
                    </div>
                );
            } else if (level === 2 || level === 3) {
                result.push(
                    <div key={Math.random()}>
                        <p onClick={(e) => goTo(e, "h3")} className="toc-3 toc-item">
                            {item.textContent}
                        </p>
                    </div>
                );
            } else {
                result.push(
                    <div key={Math.random()}>
                        <p onClick={(e) => goTo(e, "h3")} className="toc-1 toc-item">
                            {item.textContent}
                        </p>
                    </div>
                );
                level = 0;
            }
        }
    }
    if (result.length > 0) return <ToC>{result}</ToC>;
    else return null;
}

export { renderToC };
