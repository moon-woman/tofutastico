from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('admin/', admin.site.urls),
    path('api/', include('blog_api.urls', namespace='blog_api')),
    path('api/usuario/', include('usuarios.urls', namespace='usuarios')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('', include('blog.urls', namespace='blog')),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)