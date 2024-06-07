from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
import logging
class TokenObtainView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        logging.error(f'Request llegada, body: {request.data}')
        super().post(request, *args, **kwargs)