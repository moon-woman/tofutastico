from django.urls import path
from .views import CrearCustomUsuario, BlacklistTokenView


app_name = 'usuarios'

urlpatterns = [
    path('registro/', CrearCustomUsuario.as_view(), name="crear_usuario"),
    path('logout/blacklist/', BlacklistTokenView.as_view(), name="blacklist"),
]
