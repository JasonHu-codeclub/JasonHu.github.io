// types/twin.d.ts
import 'twin.macro'
import { css as cssImport } from '@emotion/react'
import styledImport from '@emotion/styled'
import { CSSInterpolation } from '@emotion/serialize'

declare module 'twin.macro' {
    // The styled and css imports
    const styled: typeof styledImport
    const css: typeof cssImport
}

declare module 'react' {
    // The tw and css prop
    export interface HTMLAttributes<T> extends DOMAttributes<T> {
        tw?: string
        css?: CSSInterpolation
    }
    // The inline svg css prop
    interface SVGProps extends SVGProps<SVGSVGElement> {
        css?: CSSInterpolation;
        tw?: string;
    }
}