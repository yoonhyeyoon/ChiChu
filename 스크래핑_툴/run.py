"""
스크래핑을 실행시키는 파일.
Selenium 패키지가 필요하므로,
쉘에서 pip install selenium 입력.
"""

import time

from drivers.helper import get_driver
from pages.lina.lina_direct_dental import LinaDirectDentalPage
from user_settings import BROWSER
from utils.timer import Timer


def main():
    # 사용하는 브라우저에 맞춰 드라이버 실행
    driver = get_driver(BROWSER)  

    # 대상 연령대 (20세부터 65세까지)
    age_list = list(range(20, 66, 5))
    
    # 연령, 생년, 성별로 이루어진 리스트 반환
    # NOTE: 연도가 4자리가 필요한 경우,
    # date_format에 소문자 %y대신 대문자 %Y로 넣기
    input_pairs = Timer().get_birth_gender_pairs(
        age_list,
        date_format=r'%y%m%d'
    )

    # 원하는 보험 페이지에 맞춰 클래스 작성하기.
    # 스크래핑이 끝났으면 주석 처리로 실행 막기.

    # 라이나 다이렉트 치아보험 (기본형)
    LinaDirectDentalPage(driver, 'standard').scrape(input_pairs)

    time.sleep(5)
    driver.quit()


if __name__ == "__main__":
    main()
