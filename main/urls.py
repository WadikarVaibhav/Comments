from django.conf.urls import url, include
from django.contrib import admin
from comments import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^posts/', views.getPosts),
    url(r'^comments/', views.getComments),
    url(r'^postComment/', views.postComment),
    url(r'^addUser/', views.addNewUser),
    url(r'^validateUser/', views.validateUser),
    url(r'^editComment/', views.editComment),

]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
