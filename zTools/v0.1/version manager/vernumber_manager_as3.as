package {
	/**
	 * @Class:           Version
	 * @Author:          ziv.yuan(ziv.yuan@gmail.com)
	 * @Version:         ver 1.0
	 * @Create Date:     [create_date]
	 * @Last Modify:     [modify_date]
	 * @Describe:
	 *                   GNU 风格版本号管理[@vm-version:VM 管理器版本号]
	 *                   [@identity:文件标识]
	 *                   [@fla-filename:原始fla文件名]
	 * @Usage:
	 *
	 */
	public class Version {
		public function Version(){
			throw new Error("Can not create Version instance.");
		}

		public static const createDate:String = "";
		public static const lastModify:String = "";

		public static const major:int = 0;
		public static const minor:int = 1;
		public static const revision:int = 0;
		public static const build:int = 0;
		public static const extend:String = "";

		/**
		 * 获取不包含编译版本号的版本字串
		 */
		public static function getVersion():String {
			return major + "." + minor + "." + revision + (extend != "" ? (" " + extend) : "");
		}

		/**
		 * 获取包含编译版本号的版本字串
		 */
		public static function getFullVersion():String {
			return major + "." + minor + "." + revision + " build-" + build + (extend != "" ? (" " + extend) : "");
		}
	}
}
