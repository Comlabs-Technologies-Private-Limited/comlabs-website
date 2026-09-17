/** Recognisable enterprise app marks at illustration scale. */

import {
  siGmail,
  siGithubcopilot,
  siGoogledrive,
  siGooglesheets,
  siNotion,
  siStripe,
} from "simple-icons";

type MarkProps = { className?: string };

const MARK = "h-3.5 w-3.5";

function SimpleBrandMark({
  path,
  hex,
  className = MARK,
}: {
  path: string;
  hex: string;
  className?: string;
}) {
  return (
    <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" aria-hidden>
      <path fill={`#${hex}`} d={path} />
    </svg>
  );
}

export function GmailMark({ className = MARK }: MarkProps) {
  return <SimpleBrandMark path={siGmail.path} hex={siGmail.hex} className={className} />;
}

export function NotionMark({ className = MARK }: MarkProps) {
  return <SimpleBrandMark path={siNotion.path} hex={siNotion.hex} className={className} />;
}

export function StripeMark({ className = MARK }: MarkProps) {
  return <SimpleBrandMark path={siStripe.path} hex={siStripe.hex} className={className} />;
}

export function DriveMark({ className = MARK }: MarkProps) {
  return <SimpleBrandMark path={siGoogledrive.path} hex={siGoogledrive.hex} className={className} />;
}

export function SheetsMark({ className = MARK }: MarkProps) {
  return <SimpleBrandMark path={siGooglesheets.path} hex={siGooglesheets.hex} className={className} />;
}

export function CopilotMark({
  className = "h-[11px] w-[11px] lg:h-[13px] lg:w-[13px]",
  color,
}: MarkProps & { color?: string }) {
  return (
    <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" aria-hidden>
      <path fill={color ?? `#${siGithubcopilot.hex}`} d={siGithubcopilot.path} />
    </svg>
  );
}

export function SlackMark({ className = "h-[11px] w-[11px] lg:h-[13px] lg:w-[13px]" }: MarkProps) {
  return (
    <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fill="#E01E5A"
        d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z"
      />
      <path
        fill="#36C5F0"
        d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z"
      />
      <path
        fill="#2EB67D"
        d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z"
      />
      <path
        fill="#ECB22E"
        d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.527 2.527 0 0 1 2.52-2.52h6.313A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"
      />
    </svg>
  );
}

export function SalesforceMark({ className = "h-[11px] w-[11px] lg:h-[13px] lg:w-[13px]" }: MarkProps) {
  return (
    <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fill="#00A1E0"
        d="M10.006 5.124c.724-1.003 1.876-1.652 3.17-1.652 1.015 0 1.926.404 2.604 1.06.52-.234 1.1-.366 1.72-.366 2.346 0 4.246 1.9 4.246 4.246 0 .08-.002.16-.006.238 1.524.56 2.62 2.04 2.62 3.782 0 2.22-1.8 4.02-4.02 4.02H5.5c-2.485 0-4.5-2.015-4.5-4.5S3.015 7.35 5.5 7.35c.52 0 1.02.088 1.486.25.724-1.28 2.08-2.126 3.62-2.126.36 0 .708.05 1.04.14.52-1.28 1.78-2.14 3.24-2.14 1.02 0 1.94.4 2.62 1.05.52-.24 1.1-.37 1.72-.37 1.2 0 2.24.62 2.84 1.56-.36-.04-.72-.06-1.08-.06-1.94 0-3.52 1.58-3.52 3.52 0 .36.06.7.16 1.02-.64-.36-1.38-.56-2.16-.56-1.94 0-3.52 1.58-3.52 3.52 0 .36.06.7.16 1.02-.64-.36-1.38-.56-2.16-.56-1.28 0-2.42.58-3.18 1.48-.36-.88-1.22-1.5-2.24-1.5-1.32 0-2.4 1.08-2.4 2.4 0 .28.05.54.14.78-.52-.24-1.1-.38-1.72-.38-2.22 0-4.02 1.8-4.02 4.02 0 2.22 1.8 4.02 4.02 4.02h12.5c3.04 0 5.5-2.46 5.5-5.5 0-2.72-1.98-4.98-4.58-5.42-.08-.62-.64-1.1-1.3-1.1-.36 0-.68.14-.92.38-.52-.88-1.46-1.46-2.54-1.46-1.04 0-1.94.48-2.54 1.22-.32-.52-.88-.86-1.52-.86-.98 0-1.78.8-1.78 1.78 0 .2.04.38.1.56-.42-.18-.88-.28-1.36-.28-1.54 0-2.78 1.24-2.78 2.78 0 .48.12.94.34 1.34-.72-.42-1.56-.66-2.46-.66-2.48 0-4.5 2.02-4.5 4.5 0 2.48 2.02 4.5 4.5 4.5h.006z"
      />
    </svg>
  );
}

export function OutlookMark({ className = "h-[11px] w-[11px] lg:h-[13px] lg:w-[13px]" }: MarkProps) {
  return (
    <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" fill="#0078D4" />
      <path
        fill="#fff"
        d="M12 8.5c-2.2 0-4 1.5-4 3.5s1.8 3.5 4 3.5 4-1.5 4-3.5-1.8-3.5-4-3.5zm0 5.5c-1.1 0-2-.7-2-1.5s.9-1.5 2-1.5 2 .7 2 1.5-.9 1.5-2 1.5z"
      />
      <rect x="4" y="6" width="7" height="5" rx="1" fill="#28A8EA" opacity="0.9" />
    </svg>
  );
}

export function ClaudeMark({ className = "h-[11px] w-[11px] lg:h-[13px] lg:w-[13px]" }: MarkProps) {
  return (
    <svg
      className={`shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="#D97757"
      fillRule="evenodd"
      aria-hidden
    >
      <path d="M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 0 0-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 0 1 .476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 0 1 4.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 0 1-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 0 0 5.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0 0 10.205 0a5.947 5.947 0 0 0-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 0 0 4.162 1.713z" />
    </svg>
  );
}

export type BrandMark = typeof SlackMark;

/** Google "G" mark — used in search discovery panels. */
export function GoogleMark({
  className = "h-[11px] w-[11px] lg:h-[13px] lg:w-[13px]",
}: MarkProps) {
  return (
    <svg
      className={`shrink-0 ${className}`}
      viewBox="-3 0 262 262"
      preserveAspectRatio="xMidYMid"
      fill="none"
      aria-hidden
    >
      <path
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
        fill="#4285F4"
      />
      <path
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
        fill="#34A853"
      />
      <path
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
        fill="#FBBC05"
      />
      <path
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
        fill="#EB4335"
      />
    </svg>
  );
}

export const ENTERPRISE_APPS = [
  { name: "Slack", Mark: SlackMark, bg: "#F4F0FF" },
  { name: "Salesforce", Mark: SalesforceMark, bg: "#E8F6FC" },
  { name: "Claude", Mark: ClaudeMark, bg: "#FDF3EF" },
  { name: "Outlook", Mark: OutlookMark, bg: "#EEF6FC" },
] as const;

/** Official AWS wordmark with smile — used in cloud infrastructure illustrations. */
export function AwsMark({ className = "h-[11px] w-[11px] lg:h-[13px] lg:w-[13px]" }: MarkProps) {
  return (
    <svg className={`shrink-0 ${className}`} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        fill="#252F3E"
        d="M4.51 7.687c0 .197.02.357.058.475.042.117.096.245.17.384a.233.233 0 01.037.123c0 .053-.032.107-.1.16l-.336.224a.255.255 0 01-.138.048c-.054 0-.107-.026-.16-.074a1.652 1.652 0 01-.192-.251 4.137 4.137 0 01-.165-.315c-.415.491-.936.737-1.564.737-.447 0-.804-.129-1.064-.385-.261-.256-.394-.598-.394-1.025 0-.454.16-.822.484-1.1.325-.278.756-.416 1.304-.416.18 0 .367.016.564.042.197.027.4.07.612.118v-.39c0-.406-.085-.689-.25-.854-.17-.166-.458-.246-.868-.246-.186 0-.377.022-.574.07a4.23 4.23 0 00-.575.181 1.525 1.525 0 01-.186.07.326.326 0 01-.085.016c-.075 0-.112-.054-.112-.166v-.262c0-.085.01-.15.037-.186a.399.399 0 01.15-.113c.185-.096.409-.176.67-.24.26-.07.537-.101.83-.101.633 0 1.096.144 1.394.432.293.288.442.726.442 1.314v1.73h.01zm-2.161.811c.175 0 .356-.032.548-.096.191-.064.362-.182.505-.342a.848.848 0 00.181-.341c.032-.129.054-.283.054-.465V7.03a4.43 4.43 0 00-.49-.09 3.996 3.996 0 00-.5-.033c-.357 0-.618.07-.793.214-.176.144-.26.347-.26.614 0 .25.063.437.196.566.128.133.314.197.559.197zm4.273.577c-.096 0-.16-.016-.202-.054-.043-.032-.08-.106-.112-.208l-1.25-4.127a.938.938 0 01-.049-.214c0-.085.043-.133.128-.133h.522c.1 0 .17.016.207.053.043.032.075.107.107.208l.894 3.535.83-3.535c.026-.106.058-.176.1-.208a.365.365 0 01.214-.053h.425c.102 0 .17.016.213.053.043.032.08.107.101.208l.841 3.578.92-3.578a.458.458 0 01.107-.208.346.346 0 01.208-.053h.495c.085 0 .133.043.133.133 0 .027-.006.054-.01.086a.76.76 0 01-.038.133l-1.283 4.127c-.032.107-.069.177-.111.209a.34.34 0 01-.203.053h-.457c-.101 0-.17-.016-.213-.053-.043-.038-.08-.107-.101-.214L8.213 5.37l-.82 3.439c-.026.107-.058.176-.1.213-.043.038-.118.054-.213.054h-.458zm6.838.144a3.51 3.51 0 01-.82-.096c-.266-.064-.473-.134-.612-.214-.085-.048-.143-.101-.165-.15a.378.378 0 01-.031-.149v-.272c0-.112.042-.166.122-.166a.3.3 0 01.096.016c.032.011.08.032.133.054.18.08.378.144.585.187.213.042.42.064.633.064.336 0 .596-.059.777-.176a.575.575 0 00.277-.508.52.52 0 00-.144-.373c-.095-.102-.276-.193-.537-.278l-.772-.24c-.388-.123-.676-.305-.851-.545a1.275 1.275 0 01-.266-.774c0-.224.048-.422.143-.593.096-.17.224-.32.384-.438.16-.122.34-.213.553-.277.213-.064.436-.091.67-.091.118 0 .24.005.357.021.122.016.234.038.346.06.106.026.208.052.303.085.096.032.17.064.224.096a.46.46 0 01.16.133.289.289 0 01.047.176v.251c0 .112-.042.171-.122.171a.552.552 0 01-.202-.064 2.427 2.427 0 00-1.022-.208c-.303 0-.543.048-.708.15-.165.1-.25.256-.25.475 0 .149.053.277.16.379.106.101.303.202.585.293l.756.24c.383.123.66.294.825.513.165.219.244.47.244.748 0 .23-.047.437-.138.619a1.436 1.436 0 01-.388.47c-.165.133-.362.23-.591.299-.24.075-.49.112-.761.112z"
      />
      <path
        fill="#F90"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.465 11.813c-1.75 1.297-4.294 1.986-6.481 1.986-3.065 0-5.827-1.137-7.913-3.027-.165-.15-.016-.353.18-.235 2.257 1.313 5.04 2.109 7.92 2.109 1.941 0 4.075-.406 6.039-1.239.293-.133.543.192.255.406z"
      />
      <path
        fill="#F90"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.194 10.98c-.223-.287-1.479-.138-2.048-.069-.17.022-.197-.128-.043-.24 1-.705 2.645-.502 2.836-.267.192.24-.053 1.89-.99 2.68-.143.123-.281.06-.218-.1.213-.53.687-1.72.463-2.003z"
      />
    </svg>
  );
}

export function CloudFrontMark({ className = "h-[10px] w-[10px] lg:h-[12px] lg:w-[12px]" }: MarkProps) {
  return (
    <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fill="#8C4FFF"
        d="M12 3c-3.2 0-5.8 2.1-6.7 5.1C2.8 8.8 1 10.9 1 13.5 1 16.8 3.7 19.5 7 19.5h10c2.8 0 5-2.2 5-5s-2.2-5-5-5c-.3-3.5-3.2-6.5-7-6.5z"
      />
    </svg>
  );
}

/** Elastic Load Balancing mark — used beside ALB nodes. */
export function AlbMark({ className = "h-[10px] w-[10px] lg:h-[12px] lg:w-[12px]" }: MarkProps) {
  return (
    <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="18" height="5" rx="1.5" fill="#8C4FFF" />
      <path
        fill="#8C4FFF"
        d="M5.5 11h3v2H5.5v-2zm5 0h3v2h-3v-2zm5 0h3v2h-3v-2zM4 15.5h4.5V19H4v-3.5zm5.75 0h4.5V19h-4.5v-3.5zm5.75 0H20V19h-4.5v-3.5z"
      />
    </svg>
  );
}

export function Ec2Mark({ className = "h-[10px] w-[10px] lg:h-[12px] lg:w-[12px]" }: MarkProps) {
  return (
    <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="12" rx="2" fill="#ED7100" />
      <rect x="6" y="8" width="12" height="6" rx="1" fill="#fff" fillOpacity="0.9" />
    </svg>
  );
}

/** ECS container mark — orange cube used on cluster nodes. */
export function EcsMark({ className = "h-[10px] w-[10px] lg:h-[12px] lg:w-[12px]" }: MarkProps) {
  return (
    <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fill="#ED7100"
        d="M12 2.5 4 7v10l8 4.5 8-4.5V7L12 2.5zm0 2.2 5.6 3.15L12 11 6.4 7.85 12 4.7zM5.5 9.1l5.5 3.1v6.5l-5.5-3.1V9.1zm13 0v6.5l-5.5 3.1v-6.5l5.5-3.1z"
      />
    </svg>
  );
}

export function RdsMark({ className = "h-[10px] w-[10px] lg:h-[12px] lg:w-[12px]" }: MarkProps) {
  return (
    <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <ellipse cx="12" cy="7" rx="8" ry="3" fill="#3B48CC" />
      <path
        fill="#3B48CC"
        d="M4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7c0 1.7-3.6 3-8 3s-8-1.3-8-3z"
      />
      <ellipse cx="12" cy="12" rx="8" ry="3" fill="#527FFF" fillOpacity="0.55" />
    </svg>
  );
}

export function CloudWatchMark({ className = "h-[10px] w-[10px] lg:h-[12px] lg:w-[12px]" }: MarkProps) {
  return (
    <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="18" height="14" rx="2" fill="#759C3E" />
      <path
        d="M6 14l3-3 3 2 5-6"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
