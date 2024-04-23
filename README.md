# PlanIt

### 서비스 설명

- 커리큘럼을 만들고 일정을 관리하며, 유저를 초대해 같이 공유할 수 있습니다.<br>
- 룰렛으로 랜덤으로 순서를 정할 수 있습니다.<br>

<br/>


## 🛠 개발환경
| 분류 | 설명 |
|:--------:|:--------:|
| 운영체제  | windows10   |
| 통항 개발 환경   | IntelliJ, VSCode   |
| 프로그래밍 언어   | Java, TypeScrypt   |
| 웹 프레임워크   | React, Node.js, Next.js, Spring Boot   |
| 버전 관리 시스템   | Git, Github   |
| 데이터베이스   | H2   |

<br/>
<br/>

## ☁️ ERD

![사진명](https://private-user-images.githubusercontent.com/149226397/324767450-166867cf-a60f-406a-b6b0-00abd24d51c1.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTM4NjMzMjIsIm5iZiI6MTcxMzg2MzAyMiwicGF0aCI6Ii8xNDkyMjYzOTcvMzI0NzY3NDUwLTE2Njg2N2NmLWE2MGYtNDA2YS1iNmIwLTAwYWJkMjRkNTFjMS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDIzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQyM1QwOTAzNDJaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1jNmI5ZDI0MDc1MDAwODUzZWQ4MGQwM2Y5Y2VlNzZlMmU1NjAxMzBjYTQxZWMwNDZjYWEzMzZmMGYzN2Y2OTQ3JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.RcK5hGcwv1PzMZ6VkInpmriUvMtFYyyq0ONlT6PlBNo)

<br>
<br>

## 👀 시연영상
[![이미지 텍스트](스크린샷 이미지)](유투브링크)

[![Video Label](http://img.youtube.com/vi/'유튜브주소의id'/0.jpg)](https://youtu.be/'유튜브주소의id')

## 🔥 트러블 슈팅

### 🚨 Issue 1
### 🚧 유저의 커리큘럼 리스트 GET요청 시 여러 번 호출


A. 이슈 내역
- 커리큘럼 리스트를 불러올 때, 내가 승인된 게스트 + 내가     호스트인 커리큘럼 리스트를 두 번 불러와야 함<br>

문제점 설명
- AccountBook 컨트롤러에서 명령어 호출하는 메서드 History 컨트롤러를 사용<br>
## 🛑 원인
- 커리큘럼에 연관된 승인된 게스트, 대기중인 게스트, 호스트의 리스트 또한 필요하기에 같은 페이지에서 유사한 기능을 하는 요청을 보내게 됨



## 🚥 해결
```java
    @Transactional
    public void own(Curriculum curriculum, SiteUser user) {
            Guest guest = Guest.builder()
                    .curriculum(curriculum)
                    .user(user)
                    .invite(true)
                    .build();
            guestRepository.save(guest);
    }
```

- 커리큘럼을 만든 호스트는 호스트이자 승인된 게스트이므로, 커리큘럼을 만드는 요청에 자동으로 해당 커리큘럼의 승인된 게스트로 등록하여 승인된 게스트의 커리큘럼 리스트를 불러오는 요청을 한 번만 보내게 함
<br>
