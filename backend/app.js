const app = require("./index");
const config = require("./utils/config");
const logger = require("./utils/logger");

const PORT = config.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`Server is running at port ${PORT}`);
});
