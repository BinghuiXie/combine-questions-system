import { Alphabet } from '@/common/constants/alphabet';
import { getArrayItem } from './array';
import { 
    IMathJax2htmlObject,
    IMathJax2htmlPayload,
    PreviewContentKey,
    PrefixType
} from '@/interfaces/utlis.interface';
import { isSelectQues, isSubjective } from './question';
import { formatError } from './error';

const CDN_URL =
    'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js?' +
    'config=TeX-MML-AM_CHTML' +
    '&delayStartupUntil=configured'

let isLoading = false
let isConfigured = false

function isLoaded(): boolean {
    if (window.MathJax) {
        if (!isConfigured) {
            isConfigured = true
            window.MathJax.Hub.Config({
                skipStartupTypeset: true,
                messageStyle: 'none',
                CommonHTML: { linebreaks: { automatic: true } },
                SVG: { linebreaks: { automatic: true } },
                includeHtmlTags: {
                    br: '\n'
                },
                tex2jax: {
                    inlineMath: [
                        // for recommend
                        ['$', '$']
                    ],
                },
            })

            window.MathJax.Hub.Configured()
        }
        if (window.MathJax.isReady) {
            return true
        }
    }

    return false
}

function loadScript(): void {
    if (isLoaded() || isLoading) {
        return
    }
    isLoading = true
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = CDN_URL
    document.getElementsByTagName('head')[0].appendChild(script)
}

export async function renderQuestionContents(payload: IMathJax2htmlPayload) {
    const { type, value } = payload;
    // 1. 渲染题干
    const main = getArrayItem<IMathJax2htmlObject>(value, PreviewContentKey.MAIN);
    if(main) {
        await latex2html(main);
    }

    // 2. 渲染试题选项（选择题）
    if(isSelectQues(type)) {
        const optionObj = getArrayItem<IMathJax2htmlObject>(value, PreviewContentKey.CHOICE);
        if(optionObj) {
            renderMultipeNodes(optionObj, PrefixType.ALPHABET)
        }
        
    }

    // 3. 渲染小问（主观题）
    const subContentObj = getArrayItem<IMathJax2htmlObject>(value, PreviewContentKey.SUB)
    if(isSubjective(type) && subContentObj && subContentObj.content.length) {
        renderMultipeNodes(subContentObj, PrefixType.NUMBER)
    }

    // 4. 渲染试题补充材料
    const contentSup = getArrayItem<IMathJax2htmlObject>(value, PreviewContentKey.CONTENT_SUP);
    if(contentSup) {
        const { content, node } = contentSup;
        try {
            await renderImage(node, content as string);
        } catch (error) {
            return formatError(error);
        }
    }

    // 5. 渲染答案
    const answer = getArrayItem<IMathJax2htmlObject>(value, PreviewContentKey.ANSWER);
    if(answer) {
        await latex2html(answer);
    }

    // 6. 渲染答案补充材料
    const answerSup = getArrayItem<IMathJax2htmlObject>(value, PreviewContentKey.ANSWER_SUP);
    if(answerSup) {
        const { content, node } = answerSup;
        try {
            await renderImage(node, content as string);
        } catch (error) {
            return formatError(error);
        }
    }
}

function renderImage(node: Element, url: string) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;
        image.onload = function() {
            node.appendChild(image);
        }
        image.onerror = function() {
            reject('image load failed');
        }
    })
}

function renderMultipeNodes(payload: IMathJax2htmlObject, prefixType: 0 | 1 = 0) {
    const { node, content, key } = payload;
    (content as string[]).forEach(async (optionContent, index) => {
        const prefix = prefixType ? `(${index + 1})`  :`${Alphabet[index]}. `;
        const p = document.createElement('p');
        await latex2html({
            key,
            node: p,
            content: prefix + optionContent
        });
        node.appendChild(p);
    })
}

async function latex2html(payload: IMathJax2htmlObject) {
    const { node: element, content: latexString } = payload;
    let mathJax: typeof MathJax | undefined;
    if(!mathJax) {
        mathJax = await loadMathJax();
    }
    const { MathJax } = window;
    if(!latexString) {
        mathJaxClear(element);
    } else {
        mathJax.tex2chtmlPromise(latexString)
        .then(function (node: any) {
            element.innerHTML = '';
            element.appendChild(node);
            mathJax.startup.document.clear();
            mathJax.startup.document.updateDocument();
        })
    }
}

async function appendHtml(element: Element, html: Element) {
    element.innerHTML = '';
    element.appendChild(html)
}

function mathJaxClear(element: Element) {
    element.innerHTML = '';
}

async function loadMathJax() {
    return new Promise((resolve, reject) => {
        
        if (window.MathJax) {
            resolve(window.MathJax)
        } else {
            const timer = setInterval(function() {
                if(window.MathJax) {
                    clearInterval(timer);
                    resolve(window.MathJax);
                } else {
                    console.info('load MathJax failed, reloading...')
                }
            }, 50)
        }
        loadScript()
    })
}
