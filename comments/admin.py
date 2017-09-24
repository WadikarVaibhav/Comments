from django.contrib import admin
from .models import posts, users, comments

admin.site.register(posts)
admin.site.register(users)
admin.site.register(comments)
