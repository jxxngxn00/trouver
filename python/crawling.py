from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time

# Chrome 드라이버 초기화
driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))

# 크롤링할 URL 정의
url = 'https://www.naver.com'
#

# selenium으로 url 열고 페이지 로드될 때까지 대기
driver.get(url)
time.sleep(5)

# 페이지 소스 가져오기
page_source = driver.page_source

# BeautifulSoup으로 페이지 소스 파싱
soup = BeautifulSoup(page_source, 'html.parser')

# 원하는 정보 추출
# (예시) 페이지에서 모든 h1 태그 추출
headings = soup.find_all('h1')

for heading in headings :
    print(heading.text)

# (예시) 페이지에서 모든 p 태그 추출
paragraphs = soup.find_all('p')

for paragraph in paragraphs :
    print(paragraph.text)


# 브라우저 닫기
driver.quit()