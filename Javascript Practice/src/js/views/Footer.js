import { View } from './View.js';

class Footer extends View {
  constructor() {
    super();
  }

  async render() {
    return `
      <footer class="footer">
        <div class="container">
          <div class="footer__col">
            <div class="footer__logo">Exclusive</div>
            <div class="footer__title">Subscribe</div>
            <div class="footer__desc">Get 10% off your first order</div>
            <form class="footer__form">
              <input type="email" placeholder="Enter your email" aria-label="Enter your email" />
              <button type="submit" aria-label="Subscribe">
                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.91199 9.9998H2.99999L1.02299 2.1348C1.01033 2.0891 1.00262 2.04216 0.999989 1.9948C0.977989 1.2738 1.77199 0.773804 2.45999 1.1038L21 9.9998L2.45999 18.8958C1.77999 19.2228 0.995989 18.7368 0.999989 18.0288C1.00201 17.9655 1.01313 17.9029 1.03299 17.8428L2.49999 12.9998" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </form>
          </div>
          <div class="footer__col">
            <div class="footer__title">Support</div>
            <div class="footer__desc">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</div>
            <div class="footer__desc">exclusive@gmail.com</div>
            <div class="footer__desc">+88015-88888-9999</div>
          </div>
          <div class="footer__col">
            <div class="footer__title">Account</div>
            <div class="footer__desc">My Account</div>
            <div class="footer__desc">Login / Register</div>
            <div class="footer__desc">Cart</div>
            <div class="footer__desc">Wishlist</div>
            <div class="footer__desc">Shop</div>
          </div>
          <div class="footer__col">
            <div class="footer__title">Quick Link</div>
            <div class="footer__desc">Privacy Policy</div>
            <div class="footer__desc">Terms Of Use</div>
            <div class="footer__desc">FAQ</div>
            <div class="footer__desc">Contact</div>
          </div>
          <div class="footer__col">
            <div class="footer__title">Download App</div>
            <div class="footer__desc-small">Save $3 with App New User Only</div>
            <div style="display: flex; align-items: center; gap: 0px; margin-bottom: 8px; justify-content: center;">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=https://exclusive.com" alt="QR Code" width="60" height="60" />
              <div style="display: flex; flex-direction: column; gap: 8px; align-items: center;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" style="width: 95px; height: 32px; border-radius: 4px;" />
                <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" style="width: 135px; height: 32px; border-radius: 4px;" />
              </div>
            </div>
            <div class="footer__socials">
              <a href="#" aria-label="Facebook">
                <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 7H10.5L10 9H6V18H4V9H0V7H4V5.128C4 3.345 4.186 2.698 4.534 2.046C4.87501 1.40181 5.40181 0.875009 6.046 0.534C6.698 0.186 7.345 0 9.128 0C9.65 0 10.108 0.0500001 10.5 0.15V2H9.128C7.804 2 7.401 2.078 6.99 2.298C6.686 2.46 6.46 2.686 6.298 2.99C6.078 3.401 6 3.804 6 5.128V7Z" fill="white"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.1211 0.443359C12.9979 0.0925405 13.9592 0.00852311 14.8838 0.201172C15.8082 0.393885 16.6557 0.854624 17.3193 1.52637L17.3486 1.55664H17.3906C17.7296 1.55426 18.0806 1.59738 18.498 1.53809C18.882 1.48352 19.3278 1.34203 19.915 1.00977C19.6091 2.49447 19.4324 3.16729 18.7646 4.08301L18.7451 4.10938V4.14258C18.7451 7.9414 17.5781 10.7564 15.8262 12.7393C14.0729 14.7234 11.7275 15.8816 9.3623 16.3535C7.7452 16.6761 5.754 16.5731 3.99609 16.2109C3.11794 16.03 2.30096 15.7842 1.62012 15.4971C1.03699 15.2511 0.560061 14.9759 0.229492 14.6885C0.6606 14.6463 1.41195 14.553 2.24414 14.3594C3.24389 14.1267 4.37194 13.749 5.20312 13.1406L5.31934 13.0557L5.19922 12.9766C4.50766 12.5207 2.81165 11.4984 1.73145 9.5166C0.667008 7.56375 0.19288 4.66296 1.91406 0.425781C3.57929 2.34325 5.27273 3.66041 6.99512 4.36719C7.57627 4.60556 7.94226 4.72333 8.23145 4.79102C8.51953 4.85841 8.73223 4.8754 8.99219 4.91113L9.28711 4.95215L9.10742 4.77148C9.13232 3.84188 9.4255 2.93867 9.9541 2.17285C10.4906 1.3958 11.2444 0.794138 12.1211 0.443359ZM13.9053 1.90137C13.119 1.90124 12.3638 2.20994 11.8027 2.76074C11.3119 3.24267 11.0038 3.87627 10.9248 4.55371L10.9053 4.84668L10.877 6.4209C10.8756 6.49137 10.8592 6.56125 10.8291 6.625C10.799 6.6887 10.7556 6.74517 10.7021 6.79102C10.6487 6.83684 10.5861 6.87164 10.5186 6.8916C10.4511 6.91147 10.3802 6.91658 10.3105 6.90723L8.74902 6.69531C6.71753 6.41828 4.7663 5.48248 2.88965 3.91895L2.75781 3.80859L2.72754 3.97754C2.42573 5.64812 2.56793 7.0709 3.14746 8.30176C3.72674 9.53198 4.73875 10.5607 6.15625 11.4521L7.90234 12.5498C7.97145 12.5932 8.02959 12.6529 8.07031 12.7236C8.11103 12.7944 8.1339 12.8744 8.13672 12.9561C8.13951 13.0377 8.12173 13.1189 8.08594 13.1924C8.05014 13.2658 7.99667 13.3299 7.93066 13.3779L6.33887 14.541L6.11523 14.7041L6.3916 14.7207C7.34472 14.7801 8.25319 14.738 9.00977 14.5879C11.3887 14.1129 13.375 12.9789 14.7656 11.2207C16.1559 9.46269 16.9453 7.08826 16.9453 4.14258C16.9453 3.99705 16.8715 3.78499 16.7441 3.55762C16.6144 3.32598 16.4211 3.06491 16.167 2.82031C15.6584 2.33085 14.8999 1.90145 13.9053 1.90137Z" fill="white" stroke="black" stroke-width="0.2"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 3H7C5.93913 3 4.92172 3.42143 4.17157 4.17157C3.42143 4.92172 3 5.93913 3 7V17C3 18.0609 3.42143 19.0783 4.17157 19.8284C4.92172 20.5786 5.93913 21 7 21H17C18.0609 21 19.0783 20.5786 19.8284 19.8284C20.5786 19.0783 21 18.0609 21 17V7C21 5.93913 20.5786 4.92172 19.8284 4.17157C19.0786 3.42143 18.0609 3 17 3Z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
                  <path d="M12 16C13.0609 16 14.0783 15.5786 14.8284 14.8284C15.5786 14.0783 16 13.0609 16 12C16 10.9391 15.5786 9.92172 14.8284 9.17157C14.0783 8.42143 13.0609 8 12 8C10.9391 8 9.92172 8.42143 9.17157 9.17157C8.42143 9.92172 8 10.9391 8 12C8 13.0609 8.42143 14.0783 9.17157 14.8284C9.92172 15.5786 10.9391 16 12 16V16Z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
                  <path d="M17.5 7.5C17.7652 7.5 18.0196 7.39464 18.2071 7.20711C18.3946 7.01957 18.5 6.76522 18.5 6.5C18.5 6.23478 18.3946 5.98043 18.2071 5.79289C18.0196 5.60536 17.7652 5.5 17.5 5.5C17.2348 5.5 16.9804 5.60536 16.7929 5.79289C16.6054 5.98043 16.5 6.23478 16.5 6.5C16.5 6.76522 16.6054 7.01957 16.7929 7.20711C16.9804 7.39464 17.2348 7.5 17.5 7.5Z" fill="white"/>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.5 6.05C9.417 5.113 10.611 4.5 12 4.5C13.4587 4.5 14.8576 5.07946 15.8891 6.11091C16.9205 7.14236 17.5 8.54131 17.5 10V17.5H15.5V10C15.5 9.07174 15.1313 8.1815 14.4749 7.52513C13.8185 6.86875 12.9283 6.5 12 6.5C11.0717 6.5 10.1815 6.86875 9.52513 7.52513C8.86875 8.1815 8.5 9.07174 8.5 10V17.5H6.5V5H8.5V6.05ZM1.5 3C1.10218 3 0.720644 2.84196 0.43934 2.56066C0.158035 2.27936 0 1.89782 0 1.5C0 1.10218 0.158035 0.720644 0.43934 0.43934C0.720644 0.158035 1.10218 0 1.5 0C1.89782 0 2.27936 0.158035 2.56066 0.43934C2.84196 0.720644 3 1.10218 3 1.5C3 1.89782 2.84196 2.27936 2.56066 2.56066C2.27936 2.84196 1.89782 3 1.5 3ZM0.5 5H2.5V17.5H0.5V5Z" fill="white"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="footer__copyright">
          &copy; Copyright Rimel 2022. All right reserved
        </div>
      </footer>
    `;
  }
}

export default Footer; 
