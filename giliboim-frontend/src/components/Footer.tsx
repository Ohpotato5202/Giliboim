import { useDispatch } from 'react-redux';
import '../styles/common/Footer.css';
import { Link, useNavigate } from 'react-router-dom';
import { resetPost, setPost } from '../features/postSlice';
import { initPost } from '../type/post';
import { resetPostItem } from '../features/postItemSlice';
import { resetGuidePoint } from '../features/guidePointSlice';

const Footer = () => {
    const navigate = useNavigate();

    // 전역으로 관리되고 있는 게시글, 게시글의 이미지를 초기화하기 윈한 dispatch 
    // 푸터 링크로 넘어갈때마다 초기화 되도록 만든다. 
    const dispatch = useDispatch();

    const initiate = () => {
        dispatch(resetPost());
        dispatch(resetPostItem());
    }


    return (
        <div className="footer">
            <Link to="/InquiryList" style={{ width: '20%', height: '100%' }} onClick={initiate}>
                <svg width="53" height="58" viewBox="0 0 53 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="27.5" cy="17.5" r="13.125" stroke="#33363F" stroke-width="2" />
                    <circle cx="27.5002" cy="26.2502" r="0.729166" fill="#33363F" stroke="#33363F" />
                    <path d="M27.5 23.3335V21.2643C27.5 19.8873 28.3811 18.6648 29.6875 18.2293V18.2293C30.9939 17.7939 31.875 16.5714 31.875 15.1943V14.446C31.875 12.1057 29.9778 10.2085 27.6375 10.2085H27.5C25.0838 10.2085 23.125 12.1673 23.125 14.5835V14.5835" stroke="#33363F" stroke-width="2" />
                    <path d="M0.255224 50.54H12.5402V51.56H0.255224V50.54ZM5.86522 51.17H7.11022V54.29H5.86522V51.17ZM1.83022 44.24H10.9502V49.01H1.83022V44.24ZM9.72022 45.245H3.04522V48.005H9.72022V45.245ZM1.81522 55.85H11.1752V56.87H1.81522V55.85ZM1.81522 52.985H3.04522V56.21H1.81522V52.985ZM18.4641 44.585C20.5791 44.585 22.0941 45.89 22.0941 47.78C22.0941 49.685 20.5791 50.99 18.4641 50.99C16.3491 50.99 14.8191 49.685 14.8191 47.78C14.8191 45.89 16.3491 44.585 18.4641 44.585ZM18.4641 45.665C17.0541 45.665 16.0341 46.52 16.0341 47.78C16.0341 49.04 17.0541 49.91 18.4641 49.91C19.8591 49.91 20.8791 49.04 20.8791 47.78C20.8791 46.52 19.8591 45.665 18.4641 45.665ZM23.8641 43.595H25.1091V57.185H23.8641V43.595ZM14.3091 54.215L14.1291 53.18C16.6041 53.18 20.0241 53.165 22.9791 52.7L23.0841 53.615C20.0391 54.2 16.7241 54.215 14.3091 54.215ZM37.0479 43.61H38.2929V57.17H37.0479V43.61ZM37.9929 49.175H40.5129V50.225H37.9929V49.175ZM27.7929 45.77H35.7879V46.79H27.7929V45.77ZM31.8429 47.915C33.7629 47.915 35.1429 49.205 35.1429 51.035C35.1429 52.865 33.7629 54.155 31.8429 54.155C29.9379 54.155 28.5429 52.865 28.5429 51.035C28.5429 49.205 29.9379 47.915 31.8429 47.915ZM31.8429 48.95C30.6129 48.95 29.7279 49.805 29.7279 51.035C29.7279 52.25 30.6129 53.12 31.8429 53.12C33.0729 53.12 33.9579 52.25 33.9579 51.035C33.9579 49.805 33.0729 48.95 31.8429 48.95ZM31.1979 43.775H32.4429V46.235H31.1979V43.775ZM51.5367 43.61H52.7817V57.17H51.5367V43.61ZM47.5617 45.065H48.7917C48.7917 48.995 47.0217 52.43 42.4917 54.65L41.8317 53.645C45.7467 51.755 47.5617 48.875 47.5617 45.275V45.065ZM42.4467 45.065H48.1017V46.085H42.4467V45.065Z" fill="black" />
                </svg>
            </Link>
            <Link to="/community" style={{ width: '20%', height: '100%' }} onClick={initiate}>

                <svg width="86" height="58" viewBox="0 0 86 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.66914 44.24C6.69414 44.24 8.13414 45.365 8.13414 47.03C8.13414 48.68 6.69414 49.835 4.66914 49.835C2.65914 49.835 1.21914 48.68 1.21914 47.03C1.21914 45.365 2.65914 44.24 4.66914 44.24ZM4.66914 45.275C3.34914 45.275 2.40414 45.995 2.40414 47.03C2.40414 48.08 3.34914 48.785 4.66914 48.785C5.98914 48.785 6.93414 48.08 6.93414 47.03C6.93414 45.995 5.98914 45.275 4.66914 45.275ZM4.11414 51.335H5.35914V56.75H4.11414V51.335ZM10.1141 43.61H11.3441V57.185H10.1141V43.61ZM0.379141 52.01L0.214141 50.96C2.73414 50.96 6.16914 50.93 9.15414 50.48L9.24414 51.41C6.18414 51.965 2.85414 52.01 0.379141 52.01ZM23.943 43.61H25.188V51.815H23.943V43.61ZM21.693 47.72H24.498V48.755H21.693V47.72ZM16.398 52.535H25.188V56.99H16.398V52.535ZM23.973 53.54H17.613V55.985H23.973V53.54ZM14.058 45.02H21.903V46.025H14.058V45.02ZM17.973 46.715C19.803 46.715 21.108 47.705 21.108 49.145C21.108 50.585 19.803 51.545 17.973 51.545C16.143 51.545 14.838 50.585 14.838 49.145C14.838 47.705 16.143 46.715 17.973 46.715ZM17.973 47.675C16.833 47.675 16.023 48.26 16.023 49.145C16.023 50.015 16.833 50.6 17.973 50.6C19.113 50.6 19.923 50.015 19.923 49.145C19.923 48.26 19.113 47.675 17.973 47.675ZM17.358 43.475H18.603V45.74H17.358V43.475ZM31.4268 45.545H32.4318V47.75C32.4318 50.615 30.7068 53.495 28.5468 54.56L27.8268 53.57C29.7918 52.64 31.4268 50.09 31.4268 47.75V45.545ZM31.6668 45.545H32.6718V47.75C32.6718 50.045 34.3068 52.385 36.3018 53.24L35.5968 54.23C33.4068 53.21 31.6668 50.57 31.6668 47.75V45.545ZM28.2768 44.99H35.8518V46.04H28.2768V44.99ZM37.6818 43.61H38.9268V57.17H37.6818V43.61ZM47.8056 45.605H51.9456V46.625H47.8056V45.605ZM47.8056 48.635H51.9456V49.67H47.8056V48.635ZM43.7406 52.355H52.7856V57.17H51.5406V53.36H43.7406V52.355ZM51.5406 43.61H52.7856V51.605H51.5406V43.61ZM45.3306 44.36C47.3256 44.36 48.8256 45.71 48.8256 47.63C48.8256 49.55 47.3256 50.885 45.3306 50.885C43.3206 50.885 41.8356 49.55 41.8356 47.63C41.8356 45.71 43.3206 44.36 45.3306 44.36ZM45.3306 45.425C44.0106 45.425 43.0356 46.34 43.0356 47.63C43.0356 48.92 44.0106 49.82 45.3306 49.82C46.6506 49.82 47.6406 48.92 47.6406 47.63C47.6406 46.34 46.6506 45.425 45.3306 45.425ZM69.9632 43.61H71.1632V57.17H69.9632V43.61ZM65.0282 48.47H67.6232V49.505H65.0282V48.47ZM67.2482 43.925H68.4182V56.48H67.2482V43.925ZM62.4182 45.71H63.3782V47.435C63.3782 50.405 62.2382 53.21 60.2432 54.47L59.4782 53.54C61.3682 52.4 62.4182 49.925 62.4182 47.435V45.71ZM62.6732 45.71H63.6332V47.435C63.6332 49.79 64.6532 52.145 66.5132 53.225L65.7482 54.14C63.7682 52.94 62.6732 50.27 62.6732 47.435V45.71ZM59.8532 45.185H66.0482V46.22H59.8532V45.185ZM73.457 54.41H85.742V55.445H73.457V54.41ZM78.947 51.17H80.192V54.71H78.947V51.17ZM74.897 44.57H76.127V46.985H83.042V44.57H84.272V51.5H74.897V44.57ZM76.127 47.99V50.48H83.042V47.99H76.127Z" fill="black" />
                    <rect x="33.2915" y="5.8335" width="20.4167" height="24.7917" rx="2" stroke="#33363F" stroke-width="2" />
                    <path d="M39.125 13.125H47.875" stroke="#33363F" stroke-width="2" stroke-linecap="round" />
                    <path d="M39.125 18.9585H47.875" stroke="#33363F" stroke-width="2" stroke-linecap="round" />
                    <path d="M39.125 24.7915H44.9583" stroke="#33363F" stroke-width="2" stroke-linecap="round" />
                </svg>

            </Link>
            <Link  to="/main" style={{ width: '20%', height: '100%' }} onClick={initiate} >
                <svg width="35" height="53" viewBox="0 0 35 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.3356 49.12H21.5906V52.99H12.3356V49.12ZM20.3756 50.08H13.5656V52.045H20.3756V50.08ZM11.4806 40.72H22.3856V41.695H11.4806V40.72ZM16.9706 42.235C19.7606 42.235 21.3506 42.895 21.3506 44.155C21.3506 45.415 19.7606 46.075 16.9706 46.075C14.1656 46.075 12.5906 45.415 12.5906 44.155C12.5906 42.895 14.1656 42.235 16.9706 42.235ZM16.9706 43.105C15.0056 43.105 13.9106 43.48 13.9106 44.155C13.9106 44.83 15.0056 45.205 16.9706 45.205C18.9206 45.205 20.0156 44.83 20.0156 44.155C20.0156 43.48 18.9206 43.105 16.9706 43.105ZM16.3556 39.415H17.5856V41.35H16.3556V39.415ZM10.8356 47.11H23.0906V48.085H10.8356V47.11ZM16.3556 45.775H17.5856V47.65H16.3556V45.775Z" fill="black" />
                    <path d="M7.2915 18.6079C7.2915 16.6279 7.2915 15.6378 7.69176 14.7676C8.09202 13.8973 8.8437 13.253 10.3471 11.9644L11.8054 10.7144C14.5228 8.38528 15.8814 7.2207 17.4998 7.2207C19.1183 7.2207 20.4769 8.38528 23.1943 10.7144L24.6526 11.9644C26.156 13.253 26.9077 13.8973 27.3079 14.7676C27.7082 15.6378 27.7082 16.6279 27.7082 18.6079V24.7918C27.7082 27.5417 27.7082 28.9166 26.8539 29.7709C25.9996 30.6252 24.6247 30.6252 21.8748 30.6252H13.1248C10.375 30.6252 9.00005 30.6252 8.14578 29.7709C7.2915 28.9166 7.2915 27.5417 7.2915 24.7918V18.6079Z" stroke="#33363F" stroke-width="2" />
                    <path d="M21.1457 30.625V22.875C21.1457 22.3227 20.698 21.875 20.1457 21.875H14.854C14.3017 21.875 13.854 22.3227 13.854 22.875V30.625" stroke="#33363F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </Link>
            <Link to="/Mypage" style={{ width: '20%', height: '100%' }} onClick={initiate}>
                <svg width="67" height="54" viewBox="0 0 67 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.434424 40.96H6.65942V49.735H0.434424V40.96ZM5.44442 41.965H1.64942V48.73H5.44442V41.965ZM9.07442 39.61H10.3344V53.17H9.07442V39.61ZM10.0344 45.025H12.5544V46.075H10.0344V45.025ZM23.5483 39.595H24.7933V53.185H23.5483V39.595ZM17.6383 40.645C19.6483 40.645 21.0883 42.49 21.0883 45.37C21.0883 48.265 19.6483 50.11 17.6383 50.11C15.6433 50.11 14.2033 48.265 14.2033 45.37C14.2033 42.49 15.6433 40.645 17.6383 40.645ZM17.6383 41.77C16.3183 41.77 15.3883 43.18 15.3883 45.37C15.3883 47.575 16.3183 49.015 17.6383 49.015C18.9733 49.015 19.8883 47.575 19.8883 45.37C19.8883 43.18 18.9733 41.77 17.6383 41.77ZM37.8871 39.61H39.0871V53.17H37.8871V39.61ZM33.4171 44.77H35.6671V45.865H33.4171V44.77ZM35.2621 39.94H36.4471V52.465H35.2621V39.94ZM27.6271 41.32H33.8221V42.34H27.6271V41.32ZM27.5071 49.84L27.3571 48.79C29.1121 48.79 32.0521 48.73 34.1071 48.46L34.1971 49.375C32.0821 49.78 29.2471 49.84 27.5071 49.84ZM28.7371 41.98H29.8771V49.075H28.7371V41.98ZM31.5571 41.98H32.6971V49.075H31.5571V41.98ZM51.1459 39.595H52.3909V53.185H51.1459V39.595ZM45.2359 40.645C47.2459 40.645 48.6859 42.49 48.6859 45.37C48.6859 48.265 47.2459 50.11 45.2359 50.11C43.2409 50.11 41.8009 48.265 41.8009 45.37C41.8009 42.49 43.2409 40.645 45.2359 40.645ZM45.2359 41.77C43.9159 41.77 42.9859 43.18 42.9859 45.37C42.9859 47.575 43.9159 49.015 45.2359 49.015C46.5709 49.015 47.4859 47.575 47.4859 45.37C47.4859 43.18 46.5709 41.77 45.2359 41.77ZM58.6897 41.545H59.6947V43.75C59.6947 46.615 57.9697 49.495 55.8097 50.56L55.0897 49.57C57.0547 48.64 58.6897 46.09 58.6897 43.75V41.545ZM58.9297 41.545H59.9347V43.75C59.9347 46.045 61.5697 48.385 63.5647 49.24L62.8597 50.23C60.6697 49.21 58.9297 46.57 58.9297 43.75V41.545ZM55.5397 40.99H63.1147V42.04H55.5397V40.99ZM64.9447 39.61H66.1897V53.17H64.9447V39.61Z" fill="black" />
                    <ellipse cx="34.4998" cy="11.6668" rx="5.83333" ry="5.83333" fill="#222222" />
                    <path d="M25.3692 23.214C26.2775 20.4906 28.9799 18.9585 31.8508 18.9585H37.1489C40.0198 18.9585 42.7222 20.4906 43.6305 23.214C44.1205 24.6832 44.5489 26.4053 44.6724 28.1676C44.7111 28.7185 44.2605 29.1668 43.7082 29.1668H25.2915C24.7392 29.1668 24.2886 28.7185 24.3272 28.1676C24.4508 26.4053 24.8791 24.6832 25.3692 23.214Z" fill="#222222" />
              </svg>
            </Link>
            <Link to="/settings" style={{ width: '20%', height: '100%' }} onClick={initiate}>
                <svg width="30" height="50" viewBox="0 0 30 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.6702 4.2018L18.6652 4.1023L18.6652 4.10229L17.6702 4.2018ZM17.3238 2.81529L18.0527 2.13059L18.0526 2.13058L17.3238 2.81529ZM18.3408 6.62487L17.8513 7.49687L17.8513 7.49687L18.3408 6.62487ZM18.5598 6.71559L18.2893 7.67831L18.2893 7.67832L18.5598 6.71559ZM20.7473 5.47641L21.3806 6.25037L21.3806 6.25037L20.7473 5.47641ZM21.9726 4.74092L21.9414 3.74141L21.9414 3.74141L21.9726 4.74092ZM22.1343 4.74899L22.0038 5.74043L22.0038 5.74043L22.1343 4.74899ZM23.2804 5.60275L22.5733 6.30985L22.5733 6.30986L23.2804 5.60275ZM24.3972 6.71958L23.6901 7.42669L23.6901 7.42669L24.3972 6.71958ZM25.251 7.86564L26.2424 7.73517L26.2424 7.73515L25.251 7.86564ZM25.259 8.02731L26.2585 8.0585L26.2585 8.05847L25.259 8.02731ZM24.5235 9.25263L23.7496 8.61939L24.5235 9.25263ZM23.2843 11.4402L22.3216 11.7107L22.3216 11.7107L23.2843 11.4402ZM23.375 11.6592L22.503 12.1487L22.503 12.1487L23.375 11.6592ZM25.7982 12.3298L25.6987 13.3249L25.6987 13.3249L25.7982 12.3298ZM27.1847 12.6762L26.5 13.405L26.5 13.405L27.1847 12.6762ZM27.2933 12.7962L26.5 13.405L26.5 13.405L27.2933 12.7962ZM27.2934 17.2037L28.0868 17.8124L28.0868 17.8124L27.2934 17.2037ZM27.1846 17.3239L27.8693 18.0528L27.8693 18.0528L27.1846 17.3239ZM25.7983 17.6702L25.8978 18.6652L25.8978 18.6652L25.7983 17.6702ZM23.3756 18.3405L24.2475 18.8302L24.2475 18.8302L23.3756 18.3405ZM23.2847 18.56L24.2475 18.8302L24.2475 18.8302L23.2847 18.56ZM24.5237 20.747L25.2977 20.1137L25.2977 20.1137L24.5237 20.747ZM25.2591 21.972L26.2586 21.9406L26.2586 21.9406L25.2591 21.972ZM25.251 22.134L26.2424 22.2646L26.2424 22.2646L25.251 22.134ZM22.1344 25.2505L22.2649 26.2419L22.2649 26.2419L22.1344 25.2505ZM21.9727 25.2585L22.0039 24.259L22.0039 24.259L21.9727 25.2585ZM20.7474 24.523L20.1142 25.297L20.1142 25.297L20.7474 24.523ZM18.5599 23.2839L18.8303 24.2466L18.8303 24.2466L18.5599 23.2839ZM18.3408 23.3746L18.8303 24.2466L18.8303 24.2466L18.3408 23.3746ZM17.6702 25.7979L18.6652 25.8974L18.6652 25.8974L17.6702 25.7979ZM17.3237 27.1848L18.0524 27.8696L18.0524 27.8696L17.3237 27.1848ZM17.2039 27.2932L16.595 26.5L16.595 26.5L17.2039 27.2932ZM12.7962 27.2933L13.405 26.5L13.405 26.5L12.7962 27.2933ZM12.6762 27.1847L13.405 26.5L13.405 26.5L12.6762 27.1847ZM12.3298 25.7982L11.3348 25.8977L11.3348 25.8977L12.3298 25.7982ZM11.6592 23.3751L12.1486 22.503L12.1486 22.503L11.6592 23.3751ZM11.4402 23.2844L11.7107 22.3216L11.7107 22.3216L11.4402 23.2844ZM9.25259 24.5236L9.88583 25.2975L9.88583 25.2975L9.25259 24.5236ZM8.02723 25.2591L8.0584 26.2586L8.0584 26.2586L8.02723 25.2591ZM7.8656 25.251L7.73513 26.2425L7.73513 26.2425L7.8656 25.251ZM6.71951 24.3972L6.0124 25.1043L6.0124 25.1043L6.71951 24.3972ZM5.60271 23.2804L4.8956 23.9875L4.8956 23.9875L5.60271 23.2804ZM4.74893 22.1344L5.74038 22.0039L5.74038 22.0039L4.74893 22.1344ZM4.74086 21.9727L5.74038 22.0039L5.74038 22.0039L4.74086 21.9727ZM5.47638 20.7474L4.70242 20.1141L4.70242 20.1141L5.47638 20.7474ZM6.71558 18.5598L7.6783 18.2893L7.6783 18.2893L6.71558 18.5598ZM6.62486 18.3408L5.75285 18.8303L5.75285 18.8303L6.62486 18.3408ZM4.20179 17.6702L4.10228 18.6652L4.10229 18.6652L4.20179 17.6702ZM2.81529 17.3238L3.5 16.595L3.5 16.595L2.81529 17.3238ZM2.70667 17.2038L1.91333 17.8126L1.91333 17.8126L2.70667 17.2038ZM2.5 15.7897L1.5 15.7897V15.7897H2.5ZM2.5 14.2104L3.5 14.2104V14.2104H2.5ZM2.70674 12.7961L3.5 13.405L3.50001 13.405L2.70674 12.7961ZM2.8152 12.6763L3.5 13.405L3.5 13.405L2.8152 12.6763ZM4.20194 12.3298L4.10244 11.3348L4.10244 11.3348L4.20194 12.3298ZM6.62542 11.659L7.49752 12.1483L7.49752 12.1483L6.62542 11.659ZM6.716 11.4403L5.75332 11.1697L5.75332 11.1697L6.716 11.4403ZM5.4766 9.25227L4.70264 9.88551L4.70264 9.88551L5.4766 9.25227ZM4.74091 8.02656L5.74043 7.99556L5.74043 7.99556L4.74091 8.02656ZM4.74896 7.86525L5.74043 7.99556L5.74043 7.99556L4.74896 7.86525ZM5.60291 6.71886L4.89581 6.01175L4.89581 6.01175L5.60291 6.71886ZM5.60292 6.71886L4.89581 6.01175L4.89581 6.01175L5.60292 6.71886ZM6.71957 5.60221L7.42667 6.30932L7.42667 6.30932L6.71957 5.60221ZM7.86565 4.74842L7.73518 3.75696L7.73518 3.75696L7.86565 4.74842ZM8.02729 4.74035L8.05846 3.74084L8.05846 3.74084L8.02729 4.74035ZM9.25274 5.47595L9.88598 4.702L9.25274 5.47595ZM11.4401 6.71515L11.7104 7.67792L11.7104 7.67792L11.4401 6.71515ZM11.6594 6.62429L11.1698 5.75237L11.1698 5.75237L11.6594 6.62429ZM12.3298 4.20163L13.3249 4.30114L13.3298 4.25151V4.20163H12.3298ZM12.3298 4.20162L11.3348 4.10212L11.3298 4.15175V4.20162H12.3298ZM12.6761 2.81539L13.405 3.5L13.405 3.49999L12.6761 2.81539ZM12.7963 2.70659L13.405 3.5L13.405 3.5L12.7963 2.70659ZM17.2038 2.70667L17.8126 1.91333L17.8126 1.91333L17.2038 2.70667ZM18.6652 4.10229C18.6296 3.74608 18.5959 3.39396 18.5328 3.10393C18.4648 2.79141 18.3414 2.43792 18.0527 2.13059L16.595 3.5C16.5387 3.44008 16.5505 3.40015 16.5786 3.52917C16.6115 3.6807 16.6348 3.89813 16.6751 4.3013L18.6652 4.10229ZM18.8303 5.75286C18.9804 5.83713 18.9377 5.94742 18.8628 5.63008C18.7888 5.31708 18.7405 4.85493 18.6652 4.1023L16.6751 4.3013C16.7444 4.99424 16.8045 5.61626 16.9163 6.08972C17.0271 6.55884 17.2474 7.15788 17.8513 7.49687L18.8303 5.75286ZM18.8303 5.75286L18.8303 5.75286L17.8513 7.49687C17.9896 7.57451 18.1366 7.63542 18.2893 7.67831L18.8303 5.75286ZM20.1141 4.70246C19.5287 5.18142 19.1677 5.47401 18.8941 5.64307C18.6167 5.81448 18.6645 5.7063 18.8303 5.75286L18.2893 7.67832C18.956 7.86562 19.5354 7.59783 19.9455 7.34445C20.3593 7.08872 20.8416 6.69135 21.3806 6.25037L20.1141 4.70246ZM21.9414 3.74141C21.52 3.75456 21.1827 3.91723 20.9136 4.09013C20.6639 4.25058 20.3912 4.47576 20.1141 4.70246L21.3806 6.25037C21.6942 5.99379 21.8644 5.85652 21.9948 5.7727C22.1059 5.70132 22.086 5.73787 22.0038 5.74043L21.9414 3.74141ZM22.2648 3.75754C22.1576 3.74343 22.0495 3.73804 21.9414 3.74141L22.0038 5.74043L22.0038 5.74043L22.2648 3.75754ZM23.9875 4.89564C23.7343 4.64251 23.4853 4.3913 23.2528 4.2068C23.0023 4.00798 22.6829 3.81257 22.2648 3.75754L22.0038 5.74043C21.9223 5.72971 21.9061 5.69135 22.0096 5.77343C22.131 5.86982 22.2867 6.02335 22.5733 6.30985L23.9875 4.89564ZM25.1043 6.01248L23.9875 4.89564L22.5733 6.30986L23.6901 7.42669L25.1043 6.01248ZM26.2424 7.73515C26.1874 7.31707 25.992 6.99768 25.7932 6.74714C25.6087 6.51464 25.3574 6.26562 25.1043 6.01248L23.6901 7.42669C23.9766 7.7132 24.1301 7.86892 24.2265 7.99038C24.3086 8.09382 24.2702 8.07763 24.2595 7.99613L26.2424 7.73515ZM26.2585 8.05847C26.2619 7.95044 26.2565 7.84232 26.2424 7.73517L24.2595 7.9961L24.2595 7.99615L26.2585 8.05847ZM25.2975 9.88587C25.5242 9.60879 25.7494 9.33601 25.9098 9.0863C26.0827 8.81723 26.2454 8.47998 26.2585 8.0585L24.2595 7.99612C24.2621 7.91395 24.2986 7.89403 24.2273 8.00512C24.1434 8.13557 24.0062 8.30579 23.7496 8.61939L25.2975 9.88587ZM24.2471 11.1697C24.2936 11.3355 24.1854 11.3833 24.3569 11.1059C24.5259 10.8323 24.8185 10.4713 25.2975 9.88587L23.7496 8.61939C23.3086 9.15837 22.9112 9.64068 22.6555 10.0545C22.4021 10.4646 22.1343 11.044 22.3216 11.7107L24.2471 11.1697ZM24.2471 11.1697L24.2471 11.1697L22.3216 11.7107C22.3645 11.8634 22.4254 12.0104 22.503 12.1487L24.2471 11.1697ZM25.8977 11.3348C25.145 11.2595 24.6829 11.2111 24.3699 11.1372C24.0525 11.0623 24.1628 11.0196 24.2471 11.1697L22.503 12.1487C22.842 12.7526 23.4411 12.9729 23.9102 13.0837C24.3837 13.1955 25.0057 13.2556 25.6987 13.3249L25.8977 11.3348ZM27.8694 11.9474C27.5621 11.6586 27.2086 11.5352 26.8961 11.4672C26.606 11.4041 26.2539 11.3704 25.8977 11.3348L25.6987 13.3249C26.1019 13.3652 26.3193 13.3885 26.4708 13.4214C26.5999 13.4495 26.5599 13.4613 26.5 13.405L27.8694 11.9474ZM28.0866 12.1874C28.0208 12.1016 27.9482 12.0214 27.8694 11.9474L26.5 13.405L26.5 13.405L28.0866 12.1874ZM28.5 14.2103C28.5 13.8523 28.5015 13.4986 28.4676 13.2037C28.431 12.8859 28.3434 12.5219 28.0866 12.1874L26.5 13.405C26.45 13.3398 26.4656 13.3012 26.4807 13.4324C26.4985 13.5864 26.5 13.8051 26.5 14.2103H28.5ZM28.5 15.7899V14.2103H26.5V15.7899H28.5ZM28.0868 17.8124C28.3434 17.4779 28.4311 17.1139 28.4676 16.7963C28.5015 16.5014 28.5 16.1478 28.5 15.7899H26.5C26.5 16.195 26.4985 16.4136 26.4807 16.5676C26.4656 16.6988 26.45 16.6602 26.5 16.595L28.0868 17.8124ZM27.8693 18.0528C27.9481 17.9787 28.0209 17.8983 28.0868 17.8124L26.5 16.595L26.5 16.595L27.8693 18.0528ZM25.8978 18.6652C26.254 18.6296 26.606 18.5959 26.896 18.5328C27.2085 18.4649 27.5619 18.3414 27.8693 18.0528L26.5 16.595C26.5599 16.5387 26.5998 16.5505 26.4708 16.5786C26.3193 16.6115 26.1019 16.6348 25.6988 16.6751L25.8978 18.6652ZM24.2475 18.8302C24.1632 18.9803 24.053 18.9376 24.3703 18.8627C24.6833 18.7888 25.1453 18.7405 25.8978 18.6652L25.6988 16.6751C25.006 16.7444 24.3841 16.8045 23.9107 16.9162C23.4417 17.027 22.8428 17.2472 22.5038 17.8508L24.2475 18.8302ZM24.2475 18.8302L24.2475 18.8302L22.5038 17.8508C22.4259 17.9894 22.3649 18.1367 22.322 18.2897L24.2475 18.8302ZM25.2977 20.1137C24.8188 19.5285 24.5263 19.1676 24.3573 18.8941C24.1859 18.6168 24.2941 18.6645 24.2475 18.8302L22.322 18.2897C22.1349 18.9563 22.4026 19.5355 22.6559 19.9455C22.9116 20.3592 23.3089 20.8414 23.7498 21.3802L25.2977 20.1137ZM26.2586 21.9406C26.2454 21.5192 26.0827 21.1821 25.9099 20.9131C25.7494 20.6635 25.5243 20.3907 25.2977 20.1137L23.7498 21.3802C24.0063 21.6937 24.1435 21.8639 24.2273 21.9943C24.2987 22.1054 24.2622 22.0855 24.2596 22.0033L26.2586 21.9406ZM26.2424 22.2646C26.2566 22.1572 26.262 22.0489 26.2586 21.9406L24.2596 22.0033L24.2596 22.0033L26.2424 22.2646ZM25.1045 23.9868C25.3576 23.7337 25.6087 23.4848 25.7932 23.2524C25.992 23.0019 26.1873 22.6826 26.2424 22.2646L24.2596 22.0033C24.2703 21.9218 24.3087 21.9057 24.2266 22.0091C24.1302 22.1305 23.9767 22.2862 23.6903 22.5726L25.1045 23.9868ZM23.9875 25.1038L25.1045 23.9868L23.6903 22.5726L22.5733 23.6896L23.9875 25.1038ZM22.2649 26.2419C22.683 26.1869 23.0023 25.9915 23.2529 25.7926C23.4854 25.6081 23.7344 25.3569 23.9875 25.1038L22.5733 23.6896C22.2868 23.9761 22.1311 24.1296 22.0096 24.226C21.9062 24.3081 21.9224 24.2697 22.0039 24.259L22.2649 26.2419ZM21.9415 26.258C22.0496 26.2614 22.1577 26.256 22.2649 26.2419L22.0039 24.259L22.0039 24.259L21.9415 26.258ZM20.1142 25.297C20.3912 25.5237 20.664 25.7489 20.9137 25.9093C21.1828 26.0822 21.52 26.2449 21.9415 26.258L22.0039 24.259C22.0861 24.2616 22.106 24.2981 21.9949 24.2267C21.8644 24.1429 21.6942 24.0057 21.3806 23.7491L20.1142 25.297ZM18.8303 24.2466C18.6646 24.2931 18.6168 24.185 18.8942 24.3564C19.1678 24.5254 19.5288 24.818 20.1142 25.297L21.3806 23.7491C20.8417 23.3081 20.3594 22.9107 19.9455 22.655C19.5355 22.4016 18.9561 22.1338 18.2894 22.3211L18.8303 24.2466ZM18.8303 24.2466L18.8303 24.2466L18.2894 22.3211C18.1367 22.364 17.9896 22.4249 17.8513 22.5026L18.8303 24.2466ZM18.6652 25.8974C18.7405 25.1447 18.7889 24.6825 18.8628 24.3694C18.9378 24.052 18.9805 24.1623 18.8303 24.2466L17.8513 22.5026C17.2474 22.8416 17.0271 23.4407 16.9163 23.9098C16.8045 24.3833 16.7445 25.0054 16.6752 25.6984L18.6652 25.8974ZM18.0524 27.8696C18.3413 27.5623 18.4648 27.2087 18.5328 26.8961C18.5959 26.606 18.6296 26.2537 18.6652 25.8974L16.6752 25.6984C16.6348 26.1017 16.6115 26.3192 16.5786 26.4708C16.5505 26.5999 16.5387 26.5599 16.595 26.5L18.0524 27.8696ZM17.8128 28.0865C17.8984 28.0208 17.9786 27.9483 18.0524 27.8696L16.595 26.5L16.595 26.5L17.8128 28.0865ZM15.7895 28.5C16.1476 28.5 16.5014 28.5015 16.7963 28.4676C17.1142 28.431 17.4783 28.3433 17.8128 28.0865L16.595 26.5C16.6602 26.4499 16.6988 26.4656 16.5676 26.4807C16.4135 26.4985 16.1948 26.5 15.7895 26.5V28.5ZM14.2103 28.5H15.7895V26.5H14.2103V28.5ZM12.1874 28.0866C12.5219 28.3434 12.8859 28.431 13.2037 28.4676C13.4986 28.5015 13.8523 28.5 14.2103 28.5V26.5C13.8051 26.5 13.5864 26.4985 13.4324 26.4807C13.3012 26.4656 13.3398 26.45 13.405 26.5L12.1874 28.0866ZM11.9474 27.8694C12.0214 27.9482 12.1016 28.0208 12.1874 28.0867L13.405 26.5L13.405 26.5L11.9474 27.8694ZM11.3348 25.8977C11.3704 26.2539 11.4041 26.606 11.4672 26.8961C11.5352 27.2086 11.6586 27.5621 11.9474 27.8694L13.405 26.5C13.4613 26.5599 13.4495 26.5999 13.4214 26.4708C13.3885 26.3193 13.3652 26.1019 13.3249 25.6987L11.3348 25.8977ZM11.1697 24.2471C11.0196 24.1628 11.0623 24.0525 11.1372 24.3699C11.2111 24.6829 11.2595 25.145 11.3348 25.8977L13.3249 25.6987C13.2556 25.0057 13.1955 24.3837 13.0837 23.9102C12.9729 23.4411 12.7526 22.842 12.1486 22.503L11.1697 24.2471ZM11.1697 24.2471L11.1697 24.2471L12.1486 22.503C12.0104 22.4254 11.8634 22.3645 11.7107 22.3216L11.1697 24.2471ZM9.88583 25.2975C10.4713 24.8185 10.8323 24.5259 11.1059 24.3569C11.3833 24.1855 11.3355 24.2936 11.1697 24.2471L11.7107 22.3216C11.044 22.1343 10.4646 22.4021 10.0545 22.6555C9.64067 22.9112 9.15835 23.3086 8.61936 23.7496L9.88583 25.2975ZM8.0584 26.2586C8.47989 26.2455 8.81715 26.0828 9.08624 25.9099C9.33595 25.7494 9.60875 25.5242 9.88583 25.2975L8.61936 23.7496C8.30575 24.0062 8.13552 24.1435 8.00506 24.2273C7.89397 24.2987 7.91389 24.2621 7.99606 24.2596L8.0584 26.2586ZM7.73513 26.2425C7.84226 26.2566 7.95037 26.262 8.0584 26.2586L7.99606 24.2596L7.99606 24.2596L7.73513 26.2425ZM6.0124 25.1043C6.26555 25.3575 6.51458 25.6087 6.74709 25.7932C6.99764 25.992 7.31704 26.1875 7.73513 26.2425L7.99607 24.2596C8.07757 24.2703 8.09376 24.3087 7.99033 24.2266C7.86886 24.1302 7.71314 23.9766 7.42662 23.6901L6.0124 25.1043ZM4.8956 23.9875L6.0124 25.1043L7.42662 23.6901L6.30982 22.5733L4.8956 23.9875ZM3.75748 22.2648C3.8125 22.6829 4.00792 23.0023 4.20674 23.2529C4.39125 23.4854 4.64246 23.7344 4.8956 23.9875L6.30982 22.5733C6.0233 22.2868 5.86977 22.1311 5.77338 22.0096C5.69129 21.9062 5.72965 21.9224 5.74038 22.0039L3.75748 22.2648ZM3.74135 21.9415C3.73798 22.0496 3.74337 22.1577 3.75748 22.2649L5.74038 22.0039L5.74038 22.0039L3.74135 21.9415ZM4.70242 20.1141C4.47572 20.3912 4.25053 20.664 4.09007 20.9137C3.91717 21.1828 3.7545 21.52 3.74135 21.9415L5.74038 22.0039C5.73781 22.0861 5.70126 22.106 5.77264 21.9949C5.85647 21.8644 5.99375 21.6942 6.25034 21.3806L4.70242 20.1141ZM5.75285 18.8303C5.70629 18.6645 5.81447 18.6167 5.64306 18.8941C5.474 19.1677 5.1814 19.5287 4.70242 20.1141L6.25034 21.3806C6.69132 20.8416 7.0887 20.3593 7.34444 19.9455C7.59782 19.5354 7.86562 18.956 7.6783 18.2893L5.75285 18.8303ZM5.75285 18.8303L5.75285 18.8303L7.6783 18.2893C7.6354 18.1366 7.5745 17.9896 7.49687 17.8513L5.75285 18.8303ZM4.10229 18.6652C4.85492 18.7405 5.31707 18.7888 5.63007 18.8628C5.94741 18.9377 5.83712 18.9804 5.75285 18.8303L7.49687 17.8513C7.15789 17.2474 6.55884 17.0271 6.08972 16.9163C5.61625 16.8045 4.99423 16.7444 4.30129 16.6751L4.10229 18.6652ZM2.13059 18.0527C2.43792 18.3414 2.79141 18.4648 3.10393 18.5328C3.39396 18.5959 3.74607 18.6296 4.10228 18.6652L4.30129 16.6751C3.89812 16.6348 3.68069 16.6115 3.52917 16.5786C3.40015 16.5505 3.44009 16.5387 3.5 16.595L2.13059 18.0527ZM1.91333 17.8126C1.97914 17.8983 2.0518 17.9786 2.13059 18.0527L3.5 16.595L3.5 16.595L1.91333 17.8126ZM1.5 15.7897C1.5 16.1477 1.49845 16.5014 1.53239 16.7963C1.56896 17.114 1.65662 17.4781 1.91333 17.8126L3.5 16.595C3.55005 16.6602 3.53437 16.6988 3.51928 16.5676C3.50155 16.4136 3.5 16.1949 3.5 15.7897H1.5ZM1.5 14.2104L1.5 15.7897L3.5 15.7897L3.5 14.2104L1.5 14.2104ZM1.91349 12.1872C1.65668 12.5218 1.56899 12.8859 1.5324 13.2037C1.49845 13.4986 1.5 13.8524 1.5 14.2104H3.5C3.5 13.8052 3.50155 13.5865 3.51928 13.4324C3.53439 13.3012 3.55006 13.3398 3.5 13.405L1.91349 12.1872ZM2.13041 11.9475C2.05175 12.0214 1.9792 12.1016 1.91348 12.1872L3.50001 13.405L3.5 13.405L2.13041 11.9475ZM4.10244 11.3348C3.74616 11.3704 3.39397 11.4041 3.10389 11.4672C2.79131 11.5352 2.43776 11.6587 2.13041 11.9475L3.5 13.405C3.44008 13.4613 3.40013 13.4495 3.52918 13.4214C3.68073 13.3885 3.89819 13.3652 4.30145 13.3248L4.10244 11.3348ZM5.75332 11.1697C5.83757 11.0195 5.94791 11.0622 5.63052 11.1372C5.31747 11.2111 4.85522 11.2595 4.10244 11.3348L4.30145 13.3248C4.99452 13.2555 5.61667 13.1955 6.09022 13.0836C6.55943 12.9728 7.15858 12.7524 7.49752 12.1483L5.75332 11.1697ZM5.75332 11.1697L5.75332 11.1697L7.49752 12.1483C7.575 12.0102 7.63581 11.8634 7.67867 11.711L5.75332 11.1697ZM4.70264 9.88551C5.18173 10.4711 5.4744 10.8322 5.64349 11.1058C5.81494 11.3833 5.70672 11.3354 5.75332 11.1697L7.67867 11.711C7.86615 11.0442 7.59832 10.4646 7.34489 10.0545C7.08911 9.64056 6.69165 9.15815 6.25055 8.61904L4.70264 9.88551ZM3.7414 8.05757C3.75447 8.47918 3.91717 8.81654 4.09012 9.08569C4.25061 9.33548 4.47587 9.60835 4.70264 9.88551L6.25055 8.61904C5.99389 8.30534 5.85657 8.13506 5.77271 8.00455C5.70131 7.89343 5.73788 7.91336 5.74043 7.99556L3.7414 8.05757ZM3.75749 7.73494C3.74343 7.84187 3.73805 7.94977 3.7414 8.05757L5.74043 7.99556L5.74043 7.99556L3.75749 7.73494ZM4.89581 6.01175C4.6426 6.26497 4.39132 6.51406 4.20677 6.74663C4.0079 6.99724 3.81245 7.31673 3.75749 7.73494L5.74043 7.99556C5.72972 8.07708 5.69135 8.09328 5.77344 7.98982C5.86986 7.86832 6.02343 7.71256 6.31002 7.42597L4.89581 6.01175ZM4.89581 6.01175L4.89581 6.01175L6.31002 7.42597L6.31002 7.42597L4.89581 6.01175ZM6.01246 4.8951L4.89581 6.01175L6.31002 7.42597L7.42667 6.30932L6.01246 4.8951ZM7.73518 3.75696C7.31709 3.81198 6.99769 4.0074 6.74715 4.20623C6.51464 4.39074 6.26561 4.64196 6.01246 4.8951L7.42667 6.30932C7.71319 6.0228 7.86891 5.86926 7.99038 5.77287C8.09382 5.69078 8.07763 5.72914 7.99612 5.73987L7.73518 3.75696ZM8.05846 3.74084C7.95044 3.73747 7.84233 3.74286 7.73518 3.75696L7.99612 5.73987L7.99612 5.73987L8.05846 3.74084ZM9.88598 4.702C9.60887 4.47526 9.33605 4.25006 9.08633 4.08959C8.81724 3.91668 8.47997 3.75398 8.05846 3.74084L7.99612 5.73987C7.91393 5.73731 7.89401 5.70074 8.00513 5.77215C8.13561 5.85599 8.30587 5.9933 8.61951 6.24991L9.88598 4.702ZM11.1698 5.75237C11.3355 5.70584 11.3833 5.814 11.1059 5.64257C10.8323 5.4735 10.4713 5.18092 9.88598 4.702L8.61951 6.24991C9.15844 6.69086 9.64069 7.08819 10.0545 7.34391C10.4645 7.59726 11.0437 7.86508 11.7104 7.67792L11.1698 5.75237ZM11.1698 5.75237L11.1698 5.75237L11.7104 7.67792C11.8633 7.63499 12.0106 7.57398 12.1491 7.4962L11.1698 5.75237ZM11.3348 4.10213C11.2595 4.85461 11.2112 5.31667 11.1373 5.62961C11.0624 5.9469 11.0197 5.83665 11.1698 5.75237L12.1491 7.4962C12.7528 7.15718 12.973 6.55824 13.0838 6.08921C13.1956 5.61583 13.2556 4.99393 13.3249 4.30114L11.3348 4.10213ZM11.3298 4.20162V4.20163H13.3298V4.20162H11.3298ZM11.9472 2.13078C11.6585 2.43808 11.5351 2.79151 11.4672 3.10396C11.4041 3.39394 11.3704 3.74598 11.3348 4.10212L13.3249 4.30113C13.3652 3.89804 13.3885 3.68066 13.4214 3.52917C13.4495 3.40017 13.4613 3.44009 13.405 3.5L11.9472 2.13078ZM12.1876 1.91318C12.1017 1.97908 12.0213 2.05185 11.9472 2.13078L13.405 3.49999L13.405 3.5L12.1876 1.91318ZM14.2101 1.5C13.8522 1.5 13.4986 1.49846 13.2037 1.53238C12.8861 1.56893 12.5221 1.65656 12.1876 1.91318L13.405 3.5C13.3398 3.55003 13.3012 3.53436 13.4324 3.51927C13.5864 3.50154 13.805 3.5 14.2101 3.5V1.5ZM15.7897 1.5H14.2101V3.5H15.7897V1.5ZM17.8126 1.91333C17.4781 1.65662 17.114 1.56896 16.7963 1.53239C16.5014 1.49845 16.1477 1.5 15.7897 1.5V3.5C16.1949 3.5 16.4136 3.50155 16.5676 3.51928C16.6988 3.53437 16.6602 3.55005 16.595 3.5L17.8126 1.91333ZM18.0526 2.13058C17.9786 2.0518 17.8984 1.97915 17.8126 1.91333L16.595 3.5L16.595 3.5L18.0526 2.13058ZM19 15C19 17.2091 17.2091 19 15 19V21C18.3137 21 21 18.3137 21 15H19ZM15 11C17.2091 11 19 12.7909 19 15H21C21 11.6863 18.3137 9 15 9V11ZM11 15C11 12.7909 12.7909 11 15 11V9C11.6863 9 9 11.6863 9 15H11ZM15 19C12.7909 19 11 17.2091 11 15H9C9 18.3137 11.6863 21 15 21V19Z" fill="#33363F" />
                    <path d="M9.02905 38.055H12.4941V39.09H9.02905V38.055ZM11.9691 35.61H13.2141V42.6H11.9691V35.61ZM4.48405 43.305H13.2141V46.545H5.74405V48.6H4.52905V45.615H11.9841V44.295H4.48405V43.305ZM4.52905 48H13.7241V48.99H4.52905V48ZM5.44405 36.03H6.46405V37.305C6.46405 39.81 4.96405 41.835 2.69905 42.645L2.05405 41.655C4.09405 40.965 5.44405 39.27 5.44405 37.305V36.03ZM5.65405 36.03H6.65905V37.305C6.65905 39.075 8.02405 40.71 9.98905 41.355L9.34405 42.33C7.15405 41.55 5.65405 39.6 5.65405 37.305V36.03ZM23.0979 39.12H26.1579V40.155H23.0979V39.12ZM25.7679 35.61H27.0129V43.695H25.7679V35.61ZM22.5579 44.1C25.3479 44.1 27.0729 45.045 27.0729 46.635C27.0729 48.24 25.3479 49.155 22.5579 49.155C19.7529 49.155 18.0279 48.24 18.0279 46.635C18.0279 45.045 19.7529 44.1 22.5579 44.1ZM22.5579 45.075C20.5179 45.075 19.2729 45.645 19.2729 46.635C19.2729 47.61 20.5179 48.18 22.5579 48.18C24.5979 48.18 25.8429 47.61 25.8429 46.635C25.8429 45.645 24.5979 45.075 22.5579 45.075ZM19.3179 36.975H20.3379V38.07C20.3379 40.575 18.8079 42.72 16.5579 43.56L15.9129 42.57C17.9229 41.835 19.3179 40.02 19.3179 38.07V36.975ZM19.5579 36.975H20.5629V38.07C20.5629 39.825 21.8829 41.505 23.8479 42.195L23.2179 43.185C21.0129 42.39 19.5579 40.35 19.5579 38.07V36.975ZM16.2879 36.6H23.5329V37.62H16.2879V36.6Z" fill="black" />
                </svg>
            </Link>
        </div>
    );
};

export default Footer;
