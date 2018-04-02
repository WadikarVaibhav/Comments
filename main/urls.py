from django.conf.urls import url, include
from django.contrib import admin
from comments import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^posts/', views.getPosts),
    url(r'^comments/', views.getComments)

]
