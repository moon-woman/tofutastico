# API endpoints postlist y pordetail
# el primero nos da una primary key
# homepage el segundo
# un view nos enseña todo el contenido y otro alguno en detalle

from .views import PostList
from rest_framework.routers import DefaultRouter

app_name = 'blog_api'

router = DefaultRouter()
router.register('', PostList, basename="post")

urlpatterns = router.urls

