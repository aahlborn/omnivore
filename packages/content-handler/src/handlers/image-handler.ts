import { ContentHandler, PreHandleResult } from '../index'

class ImageHandler extends ContentHandler {
  shouldPreHandle(url: string, _dom: Document): boolean {
    const IMAGE_URL_PATTERN = /(https?:\/\/.*\.(?:jpg|jpeg|png|webp))/i
    return IMAGE_URL_PATTERN.test(url.toString())
  }

  async preHandle(url: string, _document: Document): Promise<PreHandleResult> {
    const title = url.toString().split('/').pop()
    const content = `
      <html>
        <head>
          <title>${title}</title>
          <meta property="og:image" content="${url}" />
          <meta property="og:title" content="${title}" />
        </head>
        <body>
          <div>
            <img src="${url}" alt="${title}">
          </div>
        </body>
      </html>`

    return { title, content }
  }
}
